-- Criar tabela de perfis (estendendo a tabela auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  cpf TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'client',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de casos
CREATE TABLE IF NOT EXISTS public.cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'em_analise',
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  lawyer_id UUID REFERENCES public.profiles(id),
  type TEXT NOT NULL,
  details TEXT,
  updates INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de mensagens
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id),
  recipient_id UUID REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_read BOOLEAN DEFAULT FALSE
);

-- Criar tabela de documentos
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  uploaded_by UUID NOT NULL REFERENCES public.profiles(id),
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de eventos (agenda)
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  type TEXT NOT NULL,
  client_id UUID REFERENCES public.profiles(id),
  lawyer_id UUID NOT NULL REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de linha do tempo dos casos
CREATE TABLE IF NOT EXISTS public.case_timeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar políticas de segurança RLS (Row Level Security)

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_timeline ENABLE ROW LEVEL SECURITY;

-- Políticas para perfis
CREATE POLICY "Usuários podem ver seu próprio perfil" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Admins podem ver todos os perfis" 
  ON public.profiles FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Advogados podem ver perfis de seus clientes" 
  ON public.profiles FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.cases 
      WHERE client_id = public.profiles.id 
      AND lawyer_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'lawyer'
    )
  );

-- Políticas para casos
CREATE POLICY "Clientes podem ver seus próprios casos" 
  ON public.cases FOR SELECT 
  USING (client_id = auth.uid());

CREATE POLICY "Advogados podem ver casos atribuídos a eles" 
  ON public.cases FOR SELECT 
  USING (lawyer_id = auth.uid());

CREATE POLICY "Admins podem ver todos os casos" 
  ON public.cases FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Políticas para mensagens
CREATE POLICY "Usuários podem ver mensagens de seus casos" 
  ON public.messages FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.cases 
      WHERE id = public.messages.case_id 
      AND (client_id = auth.uid() OR lawyer_id = auth.uid())
    )
  );

CREATE POLICY "Admins podem ver todas as mensagens" 
  ON public.messages FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Políticas para documentos
CREATE POLICY "Usuários podem ver documentos de seus casos" 
  ON public.documents FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.cases 
      WHERE id = public.documents.case_id 
      AND (client_id = auth.uid() OR lawyer_id = auth.uid())
    )
  );

CREATE POLICY "Admins podem ver todos os documentos" 
  ON public.documents FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Políticas para eventos
CREATE POLICY "Advogados podem ver seus eventos" 
  ON public.events FOR SELECT 
  USING (lawyer_id = auth.uid());

CREATE POLICY "Clientes podem ver eventos relacionados a eles" 
  ON public.events FOR SELECT 
  USING (client_id = auth.uid());

CREATE POLICY "Admins podem ver todos os eventos" 
  ON public.events FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Políticas para linha do tempo
CREATE POLICY "Usuários podem ver linha do tempo de seus casos" 
  ON public.case_timeline FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.cases 
      WHERE id = public.case_timeline.case_id 
      AND (client_id = auth.uid() OR lawyer_id = auth.uid())
    )
  );

CREATE POLICY "Admins podem ver todas as linhas do tempo" 
  ON public.case_timeline FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Criar funções e gatilhos

-- Função para atualizar o contador de atualizações do caso
CREATE OR REPLACE FUNCTION public.increment_case_updates()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.cases
  SET updates = updates + 1,
      updated_at = NOW()
  WHERE id = NEW.case_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Gatilho para incrementar atualizações quando uma nova mensagem é adicionada
CREATE TRIGGER increment_updates_on_message
AFTER INSERT ON public.messages
FOR EACH ROW
EXECUTE FUNCTION public.increment_case_updates();

-- Gatilho para incrementar atualizações quando um novo documento é adicionado
CREATE TRIGGER increment_updates_on_document
AFTER INSERT ON public.documents
FOR EACH ROW
EXECUTE FUNCTION public.increment_case_updates();

-- Gatilho para incrementar atualizações quando uma nova entrada na linha do tempo é adicionada
CREATE TRIGGER increment_updates_on_timeline
AFTER INSERT ON public.case_timeline
FOR EACH ROW
EXECUTE FUNCTION public.increment_case_updates();

-- Função para atualizar o timestamp de atualização
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Gatilhos para atualizar o timestamp de atualização
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cases_updated_at
BEFORE UPDATE ON public.cases
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
