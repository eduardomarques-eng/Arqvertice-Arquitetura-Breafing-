import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendBriefingEmail(formData: any) {
  const { nome, telefone, email, terreno, perfilFamiliar, estiloVida, necessidades, investimento, expectativas } = formData;

  const html = `
    <h2>Novo Briefing de Arquitetura Recebido</h2>
    <p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
    
    <h3>Dados do Cliente</h3>
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Telefone:</strong> ${telefone}</p>
    <p><strong>Email:</strong> ${email}</p>

    <h3>Informações do Projeto</h3>
    <p><strong>Terreno:</strong> ${terreno || 'Não informado'}</p>
    <p><strong>Perfil Familiar:</strong> ${perfilFamiliar || 'Não informado'}</p>
    <p><strong>Estilo de Vida:</strong> ${estiloVida || 'Não informado'}</p>
    <p><strong>Necessidades do Projeto:</strong> ${necessidades || 'Não informado'}</p>
    <p><strong>Investimento Previsto:</strong> ${investimento || 'Não informado'}</p>
    <p><strong>Expectativas:</strong> ${expectativas || 'Não informado'}</p>
  `;

  const mailOptions = {
    from: '"Briefing Arquitetura" <' + process.env.SMTP_USER + '>',
    to: process.env.SMTP_USER,
    subject: 'Novo briefing recebido – ' + (nome || 'Cliente') + ' – ' + new Date().toLocaleDateString('pt-BR'),
    html: html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado com sucesso para', process.env.SMTP_USER);
    return { success: true, message: "Recebemos suas informações. Em breve entraremos em contato para dar início ao seu projeto exclusivo." };
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    throw new Error("Falha ao enviar o briefing. Tente novamente ou entre em contato diretamente.");
  }
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  const staticPath = process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "public")
    : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));
  app.use(express.json());

  app.post("/api/briefing", async (req: any, res: any) => {
    try {
      const data = req.body;
      
      const mappedData = {
        nome: data.clientName || "Não informado",
        telefone: data.clientPhone || "Não informado",
        email: data.clientEmail || "Não informado",
        terreno: 'Possui: ' + (data.hasLand || '') + ' - Área: ' + (data.landArea || '') + ' - Topografia: ' + (data.topography || ''),
        perfilFamiliar: 'Moradores: ' + (data.familyMembers || '') + ' - Crianças: ' + (data.hasChildren || '') + ' - Pets: ' + (data.hasPets || ''),
        estiloVida: 'Trabalha de casa: ' + (data.workFromHome || '') + ' - Rotina: ' + (data.weekdayRoutine || ''),
        necessidades: 'Dormitórios: ' + (data.bedrooms || '') + ' - Suites: ' + (data.suites || '') + ' - Banheiros: ' + (data.bathrooms || ''),
        investimento: data.budget || "Não informado",
        expectativas: data.idealHouse || "Não informado",
      };

      const result = await sendBriefingEmail(mappedData);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Erro interno" });
    }
  });

  app.get("*", (_req: any, res: any) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3001;
  server.listen(port, () => {
    console.log('Server running on http://localhost:' + port + '/');
  });
}

startServer().catch(console.error);
