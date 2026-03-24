import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, ChevronDown, ChevronUp, Home, Users, Palette, Zap, DollarSign, Clock, Lightbulb, MapPin, FileText } from 'lucide-react';

interface FormData {
  // Qualificação Inicial
  objective: string;
  phase: string;
  timeline: string;
  
  // Dados do Cliente
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientCity: string;
  clientProfession: string;
  clientIncome: string;
  
  // Terreno
  hasLand: string;
  landAddress: string;
  landArea: string;
  landDimensions: string;
  topography: string;
  condominium: string;
  condominiumRules: string;
  taxaOcupacao: string;
  solarOrientation: string;
  hasTopographic: string;
  hasSoil: string;
  
  // Perfil Familiar
  familyMembers: string;
  familyAges: string;
  hasChildren: string;
  hasElderly: string;
  hasPets: string;
  petsType: string;
  familyGrowth: string;
  
  // Estilo de Vida
  weekdayRoutine: string;
  weekendRoutine: string;
  receivesVisits: string;
  makesEvents: string;
  eventCapacity: string;
  workFromHome: string;
  needsOffice: string;
  hobbies: string;
  priorityStyle: string;
  
  // Programa de Necessidades
  bedrooms: string;
  suites: string;
  masterCloset: string;
  additionalRooms: string;
  bathrooms: string;
  livingRoom: string;
  diningRoom: string;
  tvRoom: string;
  doubleCeiling: string;
  kitchenType: string;
  kitchenIntegration: string;
  hasPiscina: string;
  hasGourmet: string;
  hasChurrasqueira: string;
  hasDeck: string;
  hasGarden: string;
  hasLavabo: string;
  hasPantry: string;
  hasLaundry: string;
  hasService: string;
  hasStorage: string;
  hasGym: string;
  hasCinema: string;
  hasWine: string;
  hasPlayroom: string;
  hasOffice: string;
  hasRooftop: string;
  
  // Estilo Arquitetônico
  architectureStyle: string;
  references: string;
  likesAboutHouse: string;
  dislikesAboutHouse: string;
  housePersonality: string;
  
  // Padrão e Acabamentos
  finishLevel: string;
  materials: string[];
  aestheticImportance: string;
  
  // Conforto e Tecnologia
  wantsAutomation: string;
  sustainability: string[];
  thermalComfort: string;
  acousticComfort: string;
  
  // Garagem
  vehicles: string;
  coveredGarage: string;
  separateSocialAccess: string;
  separateServiceAccess: string;
  
  // Investimento
  budget: string;
  budgetFlexible: string;
  priority: string;
  
  // Prazos
  projectStart: string;
  constructionStart: string;
  hasDeadline: string;
  
  // Expectativas
  idealHouse: string;
  desiredFeeling: string;
  mustHave: string;
  specificDream: string;
  
  // Referências Visuais
  visualReferences: string;
  
  // Pergunta Final
  wantsMeeting: string;
  preferredDay: string;
  preferredTime: string;
}

interface SectionProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  isCompleted?: boolean;
}

const FormSection: React.FC<SectionProps> = ({ 
  title, 
  description, 
  icon, 
  isExpanded, 
  onToggle, 
  children,
  isCompleted 
}) => (
  <div className="section-card mb-4 animate-in fade-in duration-500">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-3 hover:opacity-80 transition-opacity"
    >
      <div className="flex items-center gap-3 flex-1 text-left">
        {icon && <div className="text-primary">{icon}</div>}
        <div>
          <h3 className="section-title text-xl">{title}</h3>
          {description && <p className="section-description">{description}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isCompleted && <CheckCircle2 className="w-5 h-5 text-accent" />}
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>
    </button>
    
    {isExpanded && (
      <div className="mt-6 pt-6 border-t border-border space-y-4 animate-in fade-in duration-300">
        {children}
      </div>
    )}
  </div>
);

const FormContext = React.createContext<any>(null);

const FormField: React.FC<{ label: string; type?: string; field: string; placeholder?: string; required?: boolean }> = 
  ({ label, type = 'text', field, placeholder, required = false }) => {
    const { formData, handleInputChange } = React.useContext(FormContext);
    return (
      <div>
        <label className="form-label">
          {label}
          {required && <span className="text-destructive">*</span>}
        </label>
        <input
          type={type}
          className="form-input"
          placeholder={placeholder}
          value={formData[field as keyof FormData] as string}
          onChange={(e) => handleInputChange(field, e.target.value)}
        />
      </div>
    );
  };

const SelectField: React.FC<{ label: string; field: string; options: string[]; required?: boolean }> = 
  ({ label, field, options, required = false }) => {
    const { formData, handleInputChange } = React.useContext(FormContext);
    return (
      <div>
        <label className="form-label">
          {label}
          {required && <span className="text-destructive">*</span>}
        </label>
        <select
          className="form-select"
          value={formData[field as keyof FormData] as string}
          onChange={(e) => handleInputChange(field, e.target.value)}
        >
          <option value="">Selecione uma opção</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  };

const TextAreaField: React.FC<{ label: string; field: string; placeholder?: string; rows?: number }> = 
  ({ label, field, placeholder, rows = 4 }) => {
    const { formData, handleInputChange } = React.useContext(FormContext);
    return (
      <div>
        <label className="form-label">{label}</label>
        <textarea
          className="form-input"
          placeholder={placeholder}
          rows={rows}
          value={formData[field as keyof FormData] as string}
          onChange={(e) => handleInputChange(field, e.target.value)}
        />
      </div>
    );
  };

const CheckboxGroup: React.FC<{ label: string; field: string; options: string[] }> = 
  ({ label, field, options }) => {
    const { formData, handleCheckboxChange } = React.useContext(FormContext);
    return (
      <div>
        <label className="form-label">{label}</label>
        <div className="space-y-2">
          {options.map(opt => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={(formData[field as keyof FormData] as string[])?.includes(opt) || false}
                onChange={() => handleCheckboxChange(field, opt)}
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm">{opt}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

export const BriefingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    objective: '',
    phase: '',
    timeline: '',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    clientCity: '',
    clientProfession: '',
    clientIncome: '',
    hasLand: '',
    landAddress: '',
    landArea: '',
    landDimensions: '',
    topography: '',
    condominium: '',
    condominiumRules: '',
    taxaOcupacao: '',
    solarOrientation: '',
    hasTopographic: '',
    hasSoil: '',
    familyMembers: '',
    familyAges: '',
    hasChildren: '',
    hasElderly: '',
    hasPets: '',
    petsType: '',
    familyGrowth: '',
    weekdayRoutine: '',
    weekendRoutine: '',
    receivesVisits: '',
    makesEvents: '',
    eventCapacity: '',
    workFromHome: '',
    needsOffice: '',
    hobbies: '',
    priorityStyle: '',
    bedrooms: '',
    suites: '',
    masterCloset: '',
    additionalRooms: '',
    bathrooms: '',
    livingRoom: '',
    diningRoom: '',
    tvRoom: '',
    doubleCeiling: '',
    kitchenType: '',
    kitchenIntegration: '',
    hasPiscina: '',
    hasGourmet: '',
    hasChurrasqueira: '',
    hasDeck: '',
    hasGarden: '',
    hasLavabo: '',
    hasPantry: '',
    hasLaundry: '',
    hasService: '',
    hasStorage: '',
    hasGym: '',
    hasCinema: '',
    hasWine: '',
    hasPlayroom: '',
    hasOffice: '',
    hasRooftop: '',
    architectureStyle: '',
    references: '',
    likesAboutHouse: '',
    dislikesAboutHouse: '',
    housePersonality: '',
    finishLevel: '',
    materials: [],
    aestheticImportance: '',
    wantsAutomation: '',
    sustainability: [],
    thermalComfort: '',
    acousticComfort: '',
    vehicles: '',
    coveredGarage: '',
    separateSocialAccess: '',
    separateServiceAccess: '',
    budget: '',
    budgetFlexible: '',
    priority: '',
    projectStart: '',
    constructionStart: '',
    hasDeadline: '',
    idealHouse: '',
    desiredFeeling: '',
    mustHave: '',
    specificDream: '',
    visualReferences: '',
    wantsMeeting: '',
    preferredDay: '',
    preferredTime: '',
  });

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    qualification: true,
    client: false,
    land: false,
    family: false,
    lifestyle: false,
    program: false,
    architecture: false,
    finishes: false,
    comfort: false,
    garage: false,
    investment: false,
    timeline: false,
    expectations: false,
    references: false,
    meeting: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field as keyof FormData]) 
        ? (prev[field as keyof FormData] as string[]).includes(value)
          ? (prev[field as keyof FormData] as string[]).filter(v => v !== value)
          : [...(prev[field as keyof FormData] as string[]), value]
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (!response.ok) {
        alert(result.message || 'Erro ao enviar formulário');
        return;
      }
      alert(result.message || 'Recebemos suas informações. Em breve entraremos em contato para dar início ao seu projeto exclusivo.');
      console.log('Form Data:', formData);
    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('Falha ao enviar o formulário. Tente novamente.');
    }
  };

  return (
    <FormContext.Provider value={{ formData, handleInputChange, handleCheckboxChange }}>
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 1. QUALIFICAÇÃO INICIAL */}
      <FormSection
        title="Qualificação Inicial"
        description="Informações para filtrar e qualificar o lead"
        icon={<Lightbulb className="w-6 h-6" />}
        isExpanded={expandedSections.qualification}
        onToggle={() => toggleSection('qualification')}
      >
        <SelectField label="Qual o seu objetivo com este projeto?" field="objective" required options={['Construir para morar', 'Investimento', 'Casa de veraneio', 'Outro']} />
        <SelectField label="Em que fase você está?" field="phase" required options={['Apenas pesquisando ideias', 'Já tenho terreno', 'Pretendo construir em breve', 'Pronto para iniciar projeto']} />
        <SelectField label="Quando pretende iniciar?" field="timeline" required options={['Imediatamente', 'Em até 3 meses', '3 a 6 meses', 'Ainda sem previsão']} />
      </FormSection>

      {/* 2. DADOS DO CLIENTE */}
      <FormSection
        title="Dados do Cliente"
        description="Informações de contato e perfil profissional"
        icon={<Users className="w-6 h-6" />}
        isExpanded={expandedSections.client}
        onToggle={() => toggleSection('client')}
      >
        <FormField label="Nome completo" field="clientName" required placeholder="Seu nome" />
        <FormField label="Telefone (WhatsApp)" field="clientPhone" type="tel" required placeholder="(11) 99999-9999" />
        <FormField label="E-mail" field="clientEmail" type="email" required placeholder="seu@email.com" />
        <FormField label="Cidade/Estado" field="clientCity" required placeholder="São Paulo, SP" />
        <FormField label="Profissão" field="clientProfession" placeholder="Sua profissão" />
        <FormField label="Renda familiar mensal (opcional)" field="clientIncome" type="text" placeholder="R$ 0,00" />
      </FormSection>

      {/* 3. TERRENO */}
      <FormSection
        title="Terreno"
        description="Base do projeto arquitetônico"
        icon={<MapPin className="w-6 h-6" />}
        isExpanded={expandedSections.land}
        onToggle={() => toggleSection('land')}
      >
        <SelectField label="Possui terreno?" field="hasLand" required options={['Sim', 'Não']} />
        <FormField label="Endereço ou localização" field="landAddress" placeholder="Rua, número, bairro" />
        <FormField label="Área total (m²)" field="landArea" type="number" placeholder="500" />
        <FormField label="Dimensões (frente x fundo)" field="landDimensions" placeholder="20m x 25m" />
        <SelectField label="Topografia" field="topography" options={['Plano', 'Aclive', 'Declive']} />
        <SelectField label="Lote em" field="condominium" options={['Condomínio fechado', 'Rua aberta']} />
        <FormField label="Existe regulamento do condomínio?" field="condominiumRules" placeholder="Descreva as restrições" />
        <FormField label="Taxa de ocupação / recuos (se souber)" field="taxaOcupacao" placeholder="Ex: 50% ocupação, 5m recuo frontal" />
        <FormField label="Orientação solar (se souber)" field="solarOrientation" placeholder="Ex: Frente norte, fundo sul" />
        <SelectField label="Já possui levantamento topográfico?" field="hasTopographic" options={['Sim', 'Não']} />
        <SelectField label="Já possui sondagem do solo?" field="hasSoil" options={['Sim', 'Não']} />
      </FormSection>

      {/* 4. PERFIL FAMILIAR */}
      <FormSection
        title="Perfil Familiar"
        description="Essencial para projeto inteligente"
        icon={<Users className="w-6 h-6" />}
        isExpanded={expandedSections.family}
        onToggle={() => toggleSection('family')}
      >
        <FormField label="Quantas pessoas irão morar?" field="familyMembers" type="number" placeholder="4" />
        <FormField label="Idade de cada membro" field="familyAges" placeholder="Ex: 45, 42, 16, 12" />
        <SelectField label="Possui crianças?" field="hasChildren" options={['Sim', 'Não']} />
        <SelectField label="Possui idosos?" field="hasElderly" options={['Sim', 'Não']} />
        <SelectField label="Possui pets?" field="hasPets" options={['Sim', 'Não']} />
        <FormField label="Quais pets?" field="petsType" placeholder="Ex: 2 cachorros, 1 gato" />
        <SelectField label="Pretende aumentar a família?" field="familyGrowth" options={['Sim', 'Não', 'Talvez']} />
      </FormSection>

      {/* 5. ESTILO DE VIDA */}
      <FormSection
        title="Estilo de Vida"
        description="O coração do projeto - onde nasce o alto padrão"
        icon={<Home className="w-6 h-6" />}
        isExpanded={expandedSections.lifestyle}
        onToggle={() => toggleSection('lifestyle')}
      >
        <TextAreaField label="Como é a rotina da casa durante a semana?" field="weekdayRoutine" placeholder="Descreva a rotina típica" />
        <TextAreaField label="E nos finais de semana?" field="weekendRoutine" placeholder="Descreva as atividades de fim de semana" />
        <SelectField label="Recebe visitas com frequência?" field="receivesVisits" options={['Sim', 'Não', 'Ocasionalmente']} />
        <SelectField label="Costuma fazer eventos em casa?" field="makesEvents" options={['Sim', 'Não', 'Ocasionalmente']} />
        <FormField label="Quantas pessoas costuma receber?" field="eventCapacity" type="number" placeholder="20" />
        <SelectField label="Trabalha em casa?" field="workFromHome" options={['Sim', 'Não', 'Às vezes']} />
        <SelectField label="Precisa de escritório?" field="needsOffice" options={['Sim', 'Não']} />
        <FormField label="Pratica hobbies? Quais?" field="hobbies" placeholder="Ex: Yoga, pintura, culinária" />
        <SelectField label="Valoriza mais" field="priorityStyle" options={['Privacidade', 'Integração', 'Ambos']} />
      </FormSection>

      {/* 6. PROGRAMA DE NECESSIDADES */}
      <FormSection
        title="Programa de Necessidades"
        description="Arquitetura real - espaços e ambientes"
        icon={<Home className="w-6 h-6" />}
        isExpanded={expandedSections.program}
        onToggle={() => toggleSection('program')}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Número de dormitórios" field="bedrooms" type="number" placeholder="3" />
          <FormField label="Número de suítes" field="suites" type="number" placeholder="2" />
        </div>
        <SelectField label="Suíte master com closet?" field="masterCloset" options={['Sim', 'Não']} />
        <FormField label="Quartos adicionais" field="additionalRooms" placeholder="Descreva" />
        <FormField label="Quantidade de banheiros" field="bathrooms" type="number" placeholder="3" />
        
        <div className="border-t border-border pt-4 mt-4">
          <h4 className="font-semibold mb-3">Área Social</h4>
          <SelectField label="Sala de estar" field="livingRoom" options={['Sim', 'Não']} />
          <SelectField label="Sala de jantar" field="diningRoom" options={['Sim', 'Não']} />
          <SelectField label="Sala de TV separada?" field="tvRoom" options={['Sim', 'Não']} />
          <SelectField label="Pé-direito duplo?" field="doubleCeiling" options={['Sim', 'Não']} />
        </div>

        <div className="border-t border-border pt-4 mt-4">
          <h4 className="font-semibold mb-3">Cozinha</h4>
          <SelectField label="Cozinha aberta ou fechada?" field="kitchenType" options={['Aberta', 'Fechada', 'Híbrida']} />
          <SelectField label="Integração com área gourmet?" field="kitchenIntegration" options={['Sim', 'Não']} />
        </div>

        <div className="border-t border-border pt-4 mt-4">
          <h4 className="font-semibold mb-3">Área Externa</h4>
          <SelectField label="Piscina?" field="hasPiscina" options={['Sim', 'Não']} />
          <SelectField label="Área gourmet?" field="hasGourmet" options={['Sim', 'Não']} />
          <SelectField label="Churrasqueira?" field="hasChurrasqueira" options={['Sim', 'Não']} />
          <SelectField label="Deck?" field="hasDeck" options={['Sim', 'Não']} />
          <SelectField label="Jardim?" field="hasGarden" options={['Sim', 'Não']} />
        </div>

        <div className="border-t border-border pt-4 mt-4">
          <h4 className="font-semibold mb-3">Ambientes Funcionais</h4>
          <SelectField label="Lavabo?" field="hasLavabo" options={['Sim', 'Não']} />
          <SelectField label="Despensa?" field="hasPantry" options={['Sim', 'Não']} />
          <SelectField label="Área de serviço?" field="hasLaundry" options={['Sim', 'Não']} />
          <SelectField label="Dependência de serviço?" field="hasService" options={['Sim', 'Não']} />
          <SelectField label="Depósito?" field="hasStorage" options={['Sim', 'Não']} />
        </div>

        <div className="border-t border-border pt-4 mt-4">
          <h4 className="font-semibold mb-3">Extras (Alto Padrão)</h4>
          <SelectField label="Academia?" field="hasGym" options={['Sim', 'Não']} />
          <SelectField label="Cinema?" field="hasCinema" options={['Sim', 'Não']} />
          <SelectField label="Adega?" field="hasWine" options={['Sim', 'Não']} />
          <SelectField label="Brinquedoteca?" field="hasPlayroom" options={['Sim', 'Não']} />
          <SelectField label="Escritório?" field="hasOffice" options={['Sim', 'Não']} />
          <SelectField label="Rooftop?" field="hasRooftop" options={['Sim', 'Não']} />
        </div>
      </FormSection>

      {/* 7. ESTILO ARQUITETÔNICO */}
      <FormSection
        title="Estilo Arquitetônico e Estética"
        description="Definindo a linguagem visual do projeto"
        icon={<Palette className="w-6 h-6" />}
        isExpanded={expandedSections.architecture}
        onToggle={() => toggleSection('architecture')}
      >
        <SelectField label="Estilo preferido" field="architectureStyle" options={['Moderno', 'Contemporâneo', 'Minimalista', 'Clássico', 'Industrial', 'Outro']} />
        <TextAreaField label="Referências (links ou descrição)" field="references" placeholder="Cole links ou descreva projetos inspiradores" />
        <TextAreaField label="O que você mais gosta em uma casa?" field="likesAboutHouse" placeholder="Descreva elementos que você ama" />
        <TextAreaField label="O que você NÃO gosta?" field="dislikesAboutHouse" placeholder="Descreva o que você quer evitar" />
        <SelectField label="Quer uma casa" field="housePersonality" options={['Discreta', 'Imponente', 'Icônica']} />
      </FormSection>

      {/* 8. PADRÃO E ACABAMENTOS */}
      <FormSection
        title="Padrão e Acabamentos"
        description="Qualidade e materiais desejados"
        icon={<Palette className="w-6 h-6" />}
        isExpanded={expandedSections.finishes}
        onToggle={() => toggleSection('finishes')}
      >
        <SelectField label="Nível desejado" field="finishLevel" options={['Médio', 'Alto padrão', 'Luxo']} />
        <CheckboxGroup label="Materiais desejados" field="materials" options={['Mármore', 'Granito', 'Madeira natural', 'Vidro', 'Concreto aparente', 'Porcelanato grande formato']} />
        <SelectField label="Importância da estética" field="aestheticImportance" options={['Alta', 'Média', 'Equilibrada com custo']} />
      </FormSection>

      {/* 9. CONFORTO, TECNOLOGIA E SUSTENTABILIDADE */}
      <FormSection
        title="Conforto, Tecnologia e Sustentabilidade"
        description="Qualidade de vida e eficiência"
        icon={<Zap className="w-6 h-6" />}
        isExpanded={expandedSections.comfort}
        onToggle={() => toggleSection('comfort')}
      >
        <SelectField label="Deseja automação?" field="wantsAutomation" options={['Sim', 'Não']} />
        <CheckboxGroup label="Interesse em" field="sustainability" options={['Energia solar', 'Reuso de água', 'Ventilação cruzada', 'Iluminação natural']} />
        <SelectField label="Prioriza conforto térmico?" field="thermalComfort" options={['Sim', 'Não']} />
        <SelectField label="Prioriza conforto acústico?" field="acousticComfort" options={['Sim', 'Não']} />
      </FormSection>

      {/* 10. GARAGEM E ACESSOS */}
      <FormSection
        title="Garagem e Acessos"
        description="Circulação e estacionamento"
        icon={<Home className="w-6 h-6" />}
        isExpanded={expandedSections.garage}
        onToggle={() => toggleSection('garage')}
      >
        <FormField label="Quantidade de veículos" field="vehicles" type="number" placeholder="2" />
        <SelectField label="Garagem coberta?" field="coveredGarage" options={['Sim', 'Não']} />
        <SelectField label="Acesso social separado?" field="separateSocialAccess" options={['Sim', 'Não']} />
        <SelectField label="Acesso de serviço separado?" field="separateServiceAccess" options={['Sim', 'Não']} />
      </FormSection>

      {/* 11. INVESTIMENTO */}
      <FormSection
        title="Investimento"
        description="Filtro mais importante - orçamento do projeto"
        icon={<DollarSign className="w-6 h-6" />}
        isExpanded={expandedSections.investment}
        onToggle={() => toggleSection('investment')}
      >
        <SelectField label="Qual o investimento previsto para obra?" field="budget" required options={['Até R$ 500 mil', 'R$ 500 mil a R$ 1 milhão', 'R$ 1M a R$ 2M', 'Acima de R$ 2M']} />
        <SelectField label="Está aberto a ajustes de orçamento?" field="budgetFlexible" options={['Sim', 'Não', 'Limitadamente']} />
        <SelectField label="Prioriza" field="priority" options={['Qualidade', 'Custo-benefício', 'Equilíbrio']} />
      </FormSection>

      {/* 12. PRAZOS */}
      <FormSection
        title="Prazos"
        description="Timeline do projeto"
        icon={<Clock className="w-6 h-6" />}
        isExpanded={expandedSections.timeline}
        onToggle={() => toggleSection('timeline')}
      >
        <FormField label="Quando deseja iniciar o projeto?" field="projectStart" type="date" />
        <FormField label="Quando deseja iniciar a obra?" field="constructionStart" type="date" />
        <FormField label="Existe prazo limite?" field="hasDeadline" placeholder="Descreva limitações de tempo" />
      </FormSection>

      {/* 13. EXPECTATIVAS E DESEJOS */}
      <FormSection
        title="Expectativas e Desejos"
        description="A pergunta mais poderosa do briefing"
        icon={<Lightbulb className="w-6 h-6" />}
        isExpanded={expandedSections.expectations}
        onToggle={() => toggleSection('expectations')}
      >
        <TextAreaField label="O que seria a casa ideal para você?" field="idealHouse" rows={5} placeholder="Descreva seu sonho em detalhes" />
        <TextAreaField label="Qual sensação você quer ao entrar na casa?" field="desiredFeeling" rows={4} placeholder="Como você quer se sentir no espaço?" />
        <TextAreaField label="O que não pode faltar de forma alguma?" field="mustHave" rows={4} placeholder="Elementos imprescindíveis" />
        <TextAreaField label="Existe algum sonho específico?" field="specificDream" rows={4} placeholder="Algo único e especial que você deseja" />
      </FormSection>

      {/* 14. REFERÊNCIAS VISUAIS */}
      <FormSection
        title="Referências Visuais"
        description="Imagens e inspirações"
        icon={<FileText className="w-6 h-6" />}
        isExpanded={expandedSections.references}
        onToggle={() => toggleSection('references')}
      >
        <TextAreaField label="Links de Pinterest, Instagram ou projetos inspiradores" field="visualReferences" rows={4} placeholder="Cole links de referências visuais" />
      </FormSection>

      {/* 15. PERGUNTA ESTRATÉGICA FINAL */}
      <FormSection
        title="Próximos Passos"
        description="Fechamento e agendamento"
        icon={<Lightbulb className="w-6 h-6" />}
        isExpanded={expandedSections.meeting}
        onToggle={() => toggleSection('meeting')}
      >
        <SelectField label="Você gostaria de agendar uma reunião para discutir seu projeto?" field="wantsMeeting" required options={['Sim', 'Não']} />
        {formData.wantsMeeting === 'Sim' && (
          <>
            <FormField label="Melhor dia" field="preferredDay" type="date" />
            <FormField label="Melhor horário" field="preferredTime" type="time" />
          </>
        )}
      </FormSection>

      {/* Submit Button */}
      <div className="flex gap-3 pt-6">
        <Button
          type="submit"
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors py-3 text-base font-semibold rounded-md"
        >
          Enviar Briefing
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1 py-3 text-base font-semibold"
          onClick={() => {
            // Reset form
            setFormData({
              objective: '',
              phase: '',
              timeline: '',
              clientName: '',
              clientPhone: '',
              clientEmail: '',
              clientCity: '',
              clientProfession: '',
              clientIncome: '',
              hasLand: '',
              landAddress: '',
              landArea: '',
              landDimensions: '',
              topography: '',
              condominium: '',
              condominiumRules: '',
              taxaOcupacao: '',
              solarOrientation: '',
              hasTopographic: '',
              hasSoil: '',
              familyMembers: '',
              familyAges: '',
              hasChildren: '',
              hasElderly: '',
              hasPets: '',
              petsType: '',
              familyGrowth: '',
              weekdayRoutine: '',
              weekendRoutine: '',
              receivesVisits: '',
              makesEvents: '',
              eventCapacity: '',
              workFromHome: '',
              needsOffice: '',
              hobbies: '',
              priorityStyle: '',
              bedrooms: '',
              suites: '',
              masterCloset: '',
              additionalRooms: '',
              bathrooms: '',
              livingRoom: '',
              diningRoom: '',
              tvRoom: '',
              doubleCeiling: '',
              kitchenType: '',
              kitchenIntegration: '',
              hasPiscina: '',
              hasGourmet: '',
              hasChurrasqueira: '',
              hasDeck: '',
              hasGarden: '',
              hasLavabo: '',
              hasPantry: '',
              hasLaundry: '',
              hasService: '',
              hasStorage: '',
              hasGym: '',
              hasCinema: '',
              hasWine: '',
              hasPlayroom: '',
              hasOffice: '',
              hasRooftop: '',
              architectureStyle: '',
              references: '',
              likesAboutHouse: '',
              dislikesAboutHouse: '',
              housePersonality: '',
              finishLevel: '',
              materials: [],
              aestheticImportance: '',
              wantsAutomation: '',
              sustainability: [],
              thermalComfort: '',
              acousticComfort: '',
              vehicles: '',
              coveredGarage: '',
              separateSocialAccess: '',
              separateServiceAccess: '',
              budget: '',
              budgetFlexible: '',
              priority: '',
              projectStart: '',
              constructionStart: '',
              hasDeadline: '',
              idealHouse: '',
              desiredFeeling: '',
              mustHave: '',
              specificDream: '',
              visualReferences: '',
              wantsMeeting: '',
              preferredDay: '',
              preferredTime: '',
            });
          }}
        >
          Limpar Formulário
        </Button>
      </div>
    </form>
    </FormContext.Provider>
  );
};
