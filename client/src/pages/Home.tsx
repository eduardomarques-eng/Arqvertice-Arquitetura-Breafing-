import React, { useState, useEffect } from 'react';
import { StepForm } from '@/components/StepForm';
import { ChevronDown } from 'lucide-react';

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedShowForm = sessionStorage.getItem('showBriefingForm');
    if (savedShowForm === 'true') {
      setShowForm(true);
    }
  }, []);

  const scrollToForm = () => {
    setShowForm(true);
    sessionStorage.setItem('showBriefingForm', 'true');
    setTimeout(() => {
      const formElement = document.getElementById('briefing-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-10 md:w-12 h-10 md:h-12 bg-primary rounded-sm flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-sm md:text-lg">BA</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-base md:text-lg font-bold text-foreground truncate">Briefing Arquitetura</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">ArqVértice Premium</p>
            </div>
          </div>
          <button
            onClick={scrollToForm}
            className="btn-primary py-2 px-4 md:px-6 text-xs md:text-sm font-semibold whitespace-nowrap"
          >
            Começar Agora
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-32 border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="container max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center space-y-6 md:space-y-8 animate-fade-in-up">
            <div className="inline-block">
              <span className="text-xs font-semibold text-accent tracking-widest uppercase">
                Briefing de Projeto
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Seu Projeto de Arquitetura Começa Aqui
            </h2>

            <p className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto px-2">
              Preencha nosso formulário com todas as informações sobre seu projeto. Quanto mais detalhes você nos fornecer, melhor compreenderemos sua visão.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={scrollToForm}
                className="btn-primary py-3 md:py-4 px-6 md:px-8 text-sm md:text-base font-semibold hover:shadow-lg transition-all"
              >
                Iniciar Briefing
              </button>
              <a
                href="#briefing-form"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToForm();
                }}
                className="btn-secondary py-3 md:py-4 px-6 md:px-8 text-sm md:text-base font-semibold hover:shadow-md transition-all"
              >
                Ir para Formulário
              </a>
            </div>

            {/* Scroll Indicator */}
            <div className="pt-8 md:pt-12 flex justify-center animate-pulse-subtle">
              <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="briefing-form" className="py-12 md:py-24 bg-secondary/50 animate-fade-in-up">
        <div className="container max-w-4xl px-4">
          <div className="mb-8 md:mb-12">
            <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-center">
              Preencha seu Briefing
            </h3>
            <p className="text-base md:text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              6 etapas simples. Seus dados são salvos automaticamente conforme você avança.
            </p>
          </div>
          <div className="section-card">
            <StepForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-8 md:py-12 border-t border-border">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <h4 className="font-bold mb-2">Briefing Arquitetura</h4>
              <p className="text-sm text-primary-foreground/80 leading-relaxed">
                Plataforma profissional para coleta de dados de projetos de arquitetura residencial alto padrão.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Desenvolvido por</h4>
              <p className="text-sm text-primary-foreground/80">
                Arq. Eduardo Marques<br />
                <span className="text-xs">ArqVértice</span>
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Suporte</h4>
              <p className="text-sm text-primary-foreground/80">
                <a href="mailto:eduardo.marques.arq@gmail.com" className="hover:underline">
                  eduardo.marques.arq@gmail.com
                </a>
              </p>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/80">
            <p>&copy; 2026 Briefing Arquitetura. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
