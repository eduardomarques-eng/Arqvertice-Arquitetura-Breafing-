import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronRight, AlertCircle, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';

interface FormData {
  objective: string;
  phase: string;
  timeline: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientCity: string;
  clientProfession: string;
  hasLand: string;
  landArea: string;
  topography: string;
  familyMembers: string;
  hasChildren: string;
  hasPets: string;
  bedrooms: string;
  bathrooms: string;
  budget: string;
  idealHouse: string;
  desiredFeeling: string;
  wantsMeeting: string;
}

interface FormErrors {
  [key: string]: string;
}

const STEPS = [
  { id: 1, title: 'Qualificação', icon: '📋' },
  { id: 2, title: 'Contato', icon: '👤' },
  { id: 3, title: 'Terreno', icon: '🏗️' },
  { id: 4, title: 'Família', icon: '👨‍👩‍👧‍👦' },
  { id: 5, title: 'Necessidades', icon: '🏠' },
  { id: 6, title: 'Expectativas', icon: '✨' },
];

const REQUIRED_FIELDS: Record<number, string[]> = {
  1: ['objective', 'phase', 'timeline'],
  2: ['clientName', 'clientPhone', 'clientEmail', 'clientCity'],
  3: ['hasLand', 'landArea'],
  4: ['familyMembers', 'hasChildren'],
  5: ['bedrooms', 'bathrooms', 'budget'],
  6: ['idealHouse', 'wantsMeeting'],
};

const FormContext = React.createContext<any>(null);

const FormField: React.FC<{ 
  label: string; 
  type?: string; 
  field: string; 
  placeholder?: string; 
  required?: boolean;
  options?: string[];
  helpText?: string;
}> = ({ label, type = 'text', field, placeholder, required = false, options, helpText }) => {
  const { formData, handleInputChange, errors, touchedFields, setTouchedFields } = React.useContext(FormContext);
  const hasError = errors[field] && touchedFields.has(field);
  
  return (
    <div className="mb-6">
      <label className="form-label">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      {options ? (
        <select
          className={`form-select ${hasError ? 'border-destructive' : ''}`}
          value={formData[field as keyof FormData] as string}
          onChange={(e) => handleInputChange(field, e.target.value)}
          onBlur={() => setTouchedFields((prev: Set<string>) => new Set(prev).add(field))}
        >
          <option value="">Selecione uma opção</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          className={`form-textarea ${hasError ? 'border-destructive' : ''}`}
          placeholder={placeholder}
          rows={4}
          value={formData[field as keyof FormData] as string}
          onChange={(e) => handleInputChange(field, e.target.value)}
          onBlur={() => setTouchedFields((prev: Set<string>) => new Set(prev).add(field))}
        />
      ) : (
        <input
          type={type}
          className={`form-input ${hasError ? 'border-destructive' : ''}`}
          placeholder={placeholder}
          value={formData[field as keyof FormData] as string}
          onChange={(e) => handleInputChange(field, e.target.value)}
          onBlur={() => setTouchedFields((prev: Set<string>) => new Set(prev).add(field))}
        />
      )}
      {helpText && !hasError && (
        <p className="text-xs text-muted-foreground mt-1">{helpText}</p>
      )}
      {hasError && (
        <div className="flex items-center gap-2 mt-2 text-destructive text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errors[field]}</span>
        </div>
      )}
    </div>
  );
};


export const StepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    objective: 'Construir para morar',
    phase: 'Apenas pesquisando ideias',
    timeline: 'Ainda sem previsão',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    clientCity: '',
    clientProfession: '',
    hasLand: 'Não',
    landArea: '',
    topography: '',
    familyMembers: '2',
    hasChildren: 'Não',
    hasPets: 'Não',
    bedrooms: '3',
    bathrooms: '2',
    budget: 'Até R$ 500 mil',
    idealHouse: '',
    desiredFeeling: '',
    wantsMeeting: 'Sim',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // Load saved data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('briefingFormData');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setFormData(parsedData);
      } catch (e) {
        console.error('Error loading saved form data:', e);
      }
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('briefingFormData', JSON.stringify(formData));
  }, [formData]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10;
  };

  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const validateStep = (step: number): boolean => {
    const stepErrors: FormErrors = {};
    const requiredFields = REQUIRED_FIELDS[step];

    requiredFields.forEach(field => {
      const value = formData[field as keyof FormData];
      if (!value || value.toString().trim() === '') {
        stepErrors[field] = 'Campo obrigatório';
      }
    });

    if (step === 2 && formData.clientEmail) {
      if (!validateEmail(formData.clientEmail)) {
        stepErrors.clientEmail = 'Email inválido';
      }
    }

    if (step === 2 && formData.clientPhone) {
      if (!validatePhone(formData.clientPhone)) {
        stepErrors.clientPhone = 'Telefone inválido (mínimo 10 dígitos)';
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'clientPhone') {
      value = formatPhone(value);
    }

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    setTouchedFields(prev => new Set(prev).add(field));

    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleStepClick = (step: number) => {
    if (step === currentStep) return;
    if (step < currentStep || completedSteps.includes(step)) {
      setCurrentStep(step);
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/briefing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || 'Erro ao enviar formulário');
        }
        
        console.log('Form submitted:', formData);
        
        toast.success(result.message || 'Recebemos suas informações. Em breve entraremos em contato para dar início ao seu projeto exclusivo.');
        
        setTimeout(() => {
          setFormData({
            objective: 'Construir para morar',
            phase: 'Apenas pesquisando ideias',
            timeline: 'Ainda sem previsão',
            clientName: '',
            clientPhone: '',
            clientEmail: '',
            clientCity: '',
            clientProfession: '',
            hasLand: 'Não',
            landArea: '',
            topography: '',
            familyMembers: '2',
            hasChildren: 'Não',
            hasPets: 'Não',
            bedrooms: '3',
            bathrooms: '2',
            budget: 'Até R$ 500 mil',
            idealHouse: '',
            desiredFeeling: '',
            wantsMeeting: 'Sim',
          });
          setCurrentStep(1);
          setCompletedSteps([]);
          setTouchedFields(new Set());
          localStorage.removeItem('briefingFormData');
        }, 2000);
      } catch (error: any) {
        toast.error(error.message || 'Erro ao enviar formulário. Tente novamente.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <FormContext.Provider value={{ formData, handleInputChange, errors, touchedFields, setTouchedFields }}>
    <div className="w-full">
      {/* Tabs */}
      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-min">
          {STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => handleStepClick(step.id)}
              disabled={step.id > currentStep && !completedSteps.includes(step.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 font-medium text-sm whitespace-nowrap ${
                step.id === currentStep
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : completedSteps.includes(step.id)
                  ? 'bg-accent text-accent-foreground cursor-pointer hover:shadow-md'
                  : 'bg-secondary text-secondary-foreground cursor-not-allowed opacity-50'
              }`}
            >
              <span className="text-lg">{step.icon}</span>
              <span>{step.title}</span>
              {completedSteps.includes(step.id) && step.id !== currentStep && (
                <CheckCircle2 className="w-4 h-4 ml-1" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold text-foreground">
            {STEPS[currentStep - 1].title}
          </h2>
          <span className="text-sm text-muted-foreground font-medium">
            {currentStep}/{STEPS.length}
          </span>
        </div>
        
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="mb-8 animate-fade-in-up">
        {/* Step 1: Qualificação */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <FormField 
              label="Qual o seu objetivo com este projeto?" 
              field="objective" 
              required 
              options={['Construir para morar', 'Investimento', 'Casa de veraneio', 'Outro']} 
            />
            <FormField 
              label="Em que fase você está?" 
              field="phase" 
              required 
              options={['Apenas pesquisando ideias', 'Já tenho terreno', 'Pretendo construir em breve', 'Pronto para iniciar projeto']} 
            />
            <FormField 
              label="Quando pretende iniciar?" 
              field="timeline" 
              required 
              options={['Imediatamente', 'Em até 3 meses', '3 a 6 meses', 'Ainda sem previsão']} 
            />
          </div>
        )}

        {/* Step 2: Dados Pessoais */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <FormField label="Nome completo" field="clientName" required placeholder="João Silva" />
            <FormField 
              label="Telefone (WhatsApp)" 
              field="clientPhone" 
              type="tel" 
              required 
              placeholder="(11) 99999-9999"
              helpText="Será usado para contato direto"
            />
            <FormField label="E-mail" field="clientEmail" type="email" required placeholder="seu@email.com" />
            <FormField label="Cidade/Estado" field="clientCity" required placeholder="São Paulo, SP" />
            <FormField label="Profissão" field="clientProfession" placeholder="Sua profissão (opcional)" />
          </div>
        )}

        {/* Step 3: Terreno */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <FormField 
              label="Possui terreno?" 
              field="hasLand" 
              required 
              options={['Sim', 'Não']} 
            />
            <FormField 
              label="Área total (m²)" 
              field="landArea" 
              type="number" 
              required 
              placeholder="500"
              helpText="Deixe em branco se ainda não tem terreno"
            />
            <FormField 
              label="Topografia" 
              field="topography" 
              options={['Plano', 'Aclive', 'Declive']} 
            />
          </div>
        )}

        {/* Step 4: Família */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <FormField 
              label="Quantas pessoas irão morar?" 
              field="familyMembers" 
              type="number" 
              required 
              placeholder="4"
              helpText="Incluindo você"
            />
            <FormField 
              label="Possui crianças?" 
              field="hasChildren" 
              required 
              options={['Sim', 'Não']} 
            />
            <FormField 
              label="Possui pets?" 
              field="hasPets" 
              options={['Sim', 'Não']} 
            />
          </div>
        )}

        {/* Step 5: Necessidades */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <FormField 
              label="Número de dormitórios" 
              field="bedrooms" 
              type="number" 
              required 
              placeholder="3"
            />
            <FormField 
              label="Número de banheiros" 
              field="bathrooms" 
              type="number" 
              required 
              placeholder="2"
            />
            <FormField 
              label="Orçamento previsto" 
              field="budget" 
              required 
              options={['Até R$ 500 mil', 'R$ 500 mil a R$ 1 milhão', 'R$ 1M a R$ 2M', 'Acima de R$ 2M']} 
            />
          </div>
        )}

        {/* Step 6: Expectativas */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <FormField 
              label="O que seria a casa ideal para você?" 
              field="idealHouse" 
              type="textarea" 
              required 
              placeholder="Descreva seu sonho em detalhes..."
              helpText="Quanto mais detalhado, melhor compreenderemos sua visão"
            />
            <FormField 
              label="Qual sensação você quer ao entrar na casa?" 
              field="desiredFeeling" 
              type="textarea" 
              placeholder="Ex: Aconchego, modernidade, tranquilidade..."
            />
            <FormField 
              label="Gostaria de agendar uma reunião?" 
              field="wantsMeeting" 
              required 
              options={['Sim', 'Não']} 
            />
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          variant="outline"
          className="flex-1 py-3 text-base font-semibold"
        >
          Voltar
        </Button>

        {currentStep === STEPS.length ? (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 btn-primary py-3 text-base font-semibold flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar Briefing'
            )}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="flex-1 btn-primary py-3 text-base font-semibold flex items-center justify-center gap-2"
          >
            Próximo <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Form Completion Indicator */}
      {completedSteps.length > 0 && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Progresso: {completedSteps.length} de {STEPS.length} etapas concluídas
        </div>
      )}
    </div>
    </FormContext.Provider>
  );
};
