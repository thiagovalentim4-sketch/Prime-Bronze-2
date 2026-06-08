/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Clock, 
  Calendar, 
  ChevronRight, 
  Instagram, 
  Heart, 
  MessageCircle, 
  Check, 
  Plus, 
  X, 
  User, 
  MapPin, 
  Phone, 
  Award, 
  Star, 
  CheckCircle2, 
  Tag, 
  ChevronLeft, 
  Info, 
  CalendarDays, 
  Smile, 
  Share2,
  Sliders,
  Send,
  Sparkle
} from 'lucide-react';

// Data types matching our high-fidelity structure
interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  prep: string[];
  aftercare: string[];
  tier: 'Básico' | 'Premium' | 'Exclusivo';
}

interface InstaPost {
  id: number;
  username: string;
  likes: number;
  commentsCount: number;
  imageColor: string;
  caption: string;
  tag: string;
}

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  treatment: string;
}
export default function App() {  // Services static data
  const services: Service[] = [
    {
      id: 'paredao2h',
      name: '2 Horas de Paredão Duplo',
      duration: '120 min',
      price: 49.99,
      shortDesc: 'Sessão ultra intensa de bronzeamento em cabine vertical dupla',
      fullDesc: 'A melhor tecnologia de pigmentação rápida e homogênea. Nossa cabine Paredão Duplo garante marquinhas de fita com contraste impecável e simetria irretocável em menos tempo e com conforto térmico total.',
      benefits: [
        'Projeção de luz de alta potência para um tom uniforme',
        'Bronzeamento acelerado seguro e marquinha extremamente visível',
        'Controle de ventilação por fluxo para eliminar sensação de abafamento',
        'Monitoramento contínuo para posicionamento correto da fita adesiva'
      ],
      prep: [
        'Realizar esfoliação corporal suave 24h antes para preparar a pele',
        'Estar de pele limpa e seca, sem cremes, perfumes ou maquiagens pesadas',
        'Vir com chinelo e roupas pretas bem soltas para evitar fricção'
      ],
      aftercare: [
        'Utilizar gel refrescante ou hidratante pós-sol de alta nutrição diariamente',
        'Não tome banhos extremamente quentes ou demorados nas primeiras 24 horas',
        'Beba bastante água para manter o brilho saudável do bronze'
      ],
      tier: 'Premium'
    },
    {
      id: 'paredao1h',
      name: '1 Hora de Paredão Duplo',
      duration: '60 min',
      price: 39.99,
      shortDesc: 'Sessão focada para manutenção e realce do seu tom bronzeado',
      fullDesc: 'A solução ideal para quem quer manter seu dourado sempre em dia sem despender de muito tempo. Mesma aspersão profissional e contraste perfeito da marquinha em formato express.',
      benefits: [
        'Ação rápida perfeitamente adaptável à sua rotina',
        'Evita o desbotamento natural do tom estimulado',
        'Aceleradores orgânicos de rápida absorção dermatológica',
        'Custo-benefício imbatível e agendamento simplificado'
      ],
      prep: [
        'Esfoliar o corpo suavemente no dia anterior estimula melhor a fixação',
        'Vir preferencialmente com biquíni confortável ou fita pré-aplicada'
      ],
      aftercare: [
        'Borrife água termal ou hidratante fluido para nutrir a epiderme',
        'Evite roupas apertadas que causem atrito exagerado pós-sessão'
      ],
      tier: 'Premium'
    },
    {
      id: 'banhodelua',
      name: 'Banho de Lua',
      duration: '30 min',
      price: 9.99,
      shortDesc: 'Descoloração dourada dos pelos corporais com barreira hidratante',
      fullDesc: 'O clássico spa de descoloração dos pelos corporais. Realizamos uma esfoliação leve seguida de uma blindagem protetora especial sobre a derme para evitar pinicar, descolorindo os pelos deixando-os sedosos e brilhantes como fios de ouro.',
      benefits: [
        'Pelos loirinhos, sedosos e dourados com aspecto iluminado',
        'Barreira de toque aveludado que protege contra qualquer coceira',
        'Gomagem corporal inclusa para remover resíduos queratínicos',
        'Finalização com hidratante nutritivo aromático de pêssego'
      ],
      prep: [
        'Certificar-se de que a pele não esteja arranhada ou com queimaduras solares',
        'Não fazer depilação corporal química ou mecânica 48h antes'
      ],
      aftercare: [
        'Evitar exposição direta e forte ao sol no próprio dia da aplicação',
        'Caprichar no hidratante corporal refrescante para evitar ressecamento'
      ],
      tier: 'Básico'
    }
  ];

  // Instagram data
  const initialInstaPosts: InstaPost[] = [
    { id: 1, username: '@primebronze_luxury', likes: 245, commentsCount: 22, imageColor: 'from-[#8E6F3E]/40 to-[#0F0D0B]', caption: 'Beleza dourada esculpida com precisão e design de fita nas cabines de Paredão Duplo. ✨ Venha garantir sua marquinha dos sonhos.', tag: 'ParedaoDuplo' },
    { id: 2, username: '@carina.vargas', likes: 312, commentsCount: 29, imageColor: 'from-[#C5A059]/30 to-[#181512]', caption: 'Dia de renovação absoluta no Prime Broze! 🌙 O Banho de Lua deixa a pele hidratada de pêssego e pelos douradíssimos!', tag: 'PelosDeOuro' },
    { id: 3, username: '@primebronze_vip', likes: 114, commentsCount: 14, imageColor: 'from-[#8E6F3E]/30 to-[#0A0908]', caption: 'Nossas salas em Mesquita proporcionam privacidade total. Venha fazer sua sessão express de 1 hora de Paredão Duplo!', tag: 'VagasSemanais' },
    { id: 4, username: '@marina_glow', likes: 221, commentsCount: 18, imageColor: 'from-[#C5A059]/45 to-[#1C1917]', caption: 'Pele super iluminada, macia e com as marquinhas de biquíni mais simétricas que já tive. O Paredão Duplo de 2h é incrível!', tag: 'MarquinhaFita' },
    { id: 5, username: '@gabriela.r', likes: 459, commentsCount: 42, imageColor: 'from-[#0A0908] to-[#C5A059]/25', caption: 'O segredo por trás do bronzeado de deusa das cariocas. Atendimento de primeira classe na Prime Bronze! ☀️', tag: 'MesquitaRJ' },
    { id: 6, username: '@dr_mario_dermato', likes: 167, commentsCount: 19, imageColor: 'from-[#8E6F3E]/20 to-[#1C1917]', caption: 'Cabines verticais homologadas com segurança plena e barreira protetora ativa que poupa e nutre a barreira cutânea.', tag: 'BronzeamentoSaudavel' }
  ];

  // Initial user review list
  const initialReviews: Review[] = [
    { id: 'rev-1', name: 'Carla Mendonça', rating: 5, comment: 'Totalmente apaixonada pela minha marquinha no Paredão Duplo! O Prime Bronze é de longe o melhor espaço da região de Mesquita. Atendimento super afetuoso e resultado espetacular.', date: '05/06/2026', treatment: '2 Horas de Paredão Duplo' },
    { id: 'rev-2', name: 'Isabela Moraes', rating: 5, comment: 'A sessão de 1 hora de Paredão Duplo é perfeita! Dá para manter o bronze sempre brilhante mesmo na correria do dia a dia. Recomendo muito o biquíni de fita adesiva!', date: '01/06/2026', treatment: '1 Hora de Paredão Duplo' },
    { id: 'rev-3', name: 'Amanda Valença', rating: 5, comment: 'Maravilhoso demais o Banho de Lua! Custou R$ 9,99 e meus pelos ficaram super dourados como ouro, sem contar que não coçou nada porque elas passam uma cera protetora deliciosa antes do produto. Nota dez!', date: '28/05/2026', treatment: 'Banho de Lua' }
  ];

  // Page level state
  const [activeTab, setActiveTab] = useState<'services' | 'gallery' | 'promotions' | 'reviews'>('services');
  const [selectedService, setSelectedService] = useState<Service>(services[0]);
  const [instaPosts, setInstaPosts] = useState<InstaPost[]>(initialInstaPosts);
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('prime_broze_reviews');
    return saved ? JSON.parse(saved) : initialReviews;
  });

  // Testimonials Form States
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTreatment, setNewReviewTreatment] = useState(services[0].name);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState(false);

  // New Comment State for Gallery Subsystem
  const [galleryCommentText, setGalleryCommentText] = useState<{ [key: number]: string }>({});
  const [galleryCommentsList, setGalleryCommentsList] = useState<{ [key: number]: string[] }>({
    1: ['Resultado lindo!', 'Quero agendar hoje mesmo'],
    2: ['O melhor banho de lua que já fiz!', 'Pele super ultra hidratada'],
    4: ['Simplesmente encantada com o brilho', 'A melhor equipe!']
  });

  // Lightbox view state
  const [activeLightboxPost, setActiveLightboxPost] = useState<InstaPost | null>(null);

  // Promo Calculator State
  const [calcSessionsNum, setCalcSessionsNum] = useState<number>(5);
  const [calcAddEsfoliacao, setCalcAddEsfoliacao] = useState<boolean>(false);
  const [calcAddFacial, setCalcAddFacial] = useState<boolean>(false);
  const [calcAppliedCoupon, setCalcAppliedCoupon] = useState<string>('');
  const [isCouponVerified, setIsCouponVerified] = useState<boolean>(false);
  const [calculatorMessage, setCalculatorMessage] = useState<string>('');

  // Floating Booking State
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [bookingServicesSelected, setBookingServicesSelected] = useState<string[]>([services[0].id]);
  const [bookingDate, setBookingDate] = useState<string>('2026-06-10');
  const [bookingTime, setBookingTime] = useState<string>('14:30');
  const [bookingSpecialist, setBookingSpecialist] = useState<string>('Renata Mendes');
  const [bookingName, setBookingName] = useState<string>('');
  const [bookingPhone, setBookingPhone] = useState<string>('');
  const [bookingCoupon, setBookingCoupon] = useState<string>('');
  const [bookingFinalSuccess, setBookingFinalSuccess] = useState<boolean>(false);
  const [generatedWhatsAppLink, setGeneratedWhatsAppLink] = useState<string>('');

  // Save reviews when changed
  useEffect(() => {
    localStorage.setItem('prime_broze_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Handle Post Likes locally
  const handleLikePost = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setInstaPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };

  // Add Comment inside gallery elements
  const handleAddGalleryComment = (postId: number) => {
    const text = galleryCommentText[postId]?.trim();
    if (!text) return;
    setGalleryCommentsList(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), text]
    }));
    setInstaPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, commentsCount: post.commentsCount + 1 };
      }
      return post;
    }));
    setGalleryCommentText(prev => ({ ...prev, [postId]: '' }));
  };

  // Pricing calculator logic
  const baseServicePrice = selectedService ? selectedService.price : 49.99;
  
  // Custom formula pricing based on slider
  const calcBaseTotal = calcSessionsNum * baseServicePrice;
  const calcPromoDiscount = calcSessionsNum >= 5 ? baseServicePrice : 0; // Buy 5 get 1 free rule modeled
  const calcEsfoliacaoCost = calcAddEsfoliacao ? calcSessionsNum * 40 : 0;
  const calcFacialCost = calcAddFacial ? calcSessionsNum * 60 : 0;
  let calcFinalPrice = calcBaseTotal - calcPromoDiscount + calcEsfoliacaoCost + calcFacialCost;

  // Coupon application logic
  if (isCouponVerified && calcAppliedCoupon.toUpperCase() === 'PRIME10') {
    calcFinalPrice = Math.round(calcFinalPrice * 0.9);
  }

  const handleApplyCalcCoupon = () => {
    if (calcAppliedCoupon.trim().toUpperCase() === 'PRIME10') {
      setIsCouponVerified(true);
      setCalculatorMessage('Cupom PRIME10 ativado com sucesso! 10% de desconto adicional aplicado.');
    } else {
      setIsCouponVerified(false);
      setCalculatorMessage('Cupom inválido ou expirado.');
    }
  };

  // Add new reviews written by clients
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const added: Review = {
      id: `rev-${Date.now()}`,
      name: newReviewName,
      comment: newReviewComment,
      rating: newReviewRating,
      date: 'Hoje',
      treatment: newReviewTreatment
    };

    setReviews(prev => [added, ...prev]);
    setNewReviewName('');
    setNewReviewComment('');
    setReviewSuccessMsg(true);
    setTimeout(() => {
      setReviewSuccessMsg(false);
    }, 4000);
  };

  // Custom scheduling calendar options
  const calendarDates = [
    { day: '08', weekday: 'Seg', dateStr: '2026-06-08', available: true },
    { day: '09', weekday: 'Ter', dateStr: '2026-06-09', available: true },
    { day: '10', weekday: 'Qua', dateStr: '2026-06-10', available: true },
    { day: '11', weekday: 'Qui', dateStr: '2026-06-11', available: true },
    { day: '12', weekday: 'Sex', dateStr: '2026-06-12', available: true },
    { day: '13', weekday: 'Sáb', dateStr: '2026-06-13', available: true },
    { day: '14', weekday: 'Dom', dateStr: '2026-06-14', available: false }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '13:00', '14:30', '15:30', '16:30', '18:00'
  ];

  const specialists = [
    { name: 'Renata Mendes', role: 'Bronze Master Expert', stars: 5, reviews: 142 },
    { name: 'Alice Silva', role: 'Esteticista & Glow Specialist', stars: 4.9, reviews: 98 },
    { name: 'Bruna Loreto', role: 'Therapist Corporal Senior', stars: 5, reviews: 63 }
  ];

  // Interactive booking logic
  const handleToggleBookingService = (serviceId: string) => {
    setBookingServicesSelected(prev => {
      if (prev.includes(serviceId)) {
        if (prev.length === 1) return prev; // Keep at least one selected
        return prev.filter(id => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  // Build booking WhatsApp request link dynamically
  const executeBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim() || !bookingPhone.trim()) {
      alert('Por favor, insira o seu nome e telefone.');
      return;
    }

    const selectedServiceNames = services
      .filter(s => bookingServicesSelected.includes(s.id))
      .map(s => s.name)
      .join(', ');

    const totalCost = services
      .filter(s => bookingServicesSelected.includes(s.id))
      .reduce((acc, curr) => acc + curr.price, 0);

    // Format the date readable
    const matchedDateObj = calendarDates.find(d => d.dateStr === bookingDate);
    const dateFormatted = matchedDateObj 
      ? `${matchedDateObj.day}/06 (${matchedDateObj.weekday})`
      : bookingDate;

    const messageText = `Olá Prime Bronze! Gostaria de agendar:\n\n` +
      `✨ *Serviço(s):* ${selectedServiceNames}\n` +
      `📅 *Data:* *${dateFormatted}*\n` +
      `⏰ *Horário:* *${bookingTime}*\n` +
      `💄 *Profissional:* *${bookingSpecialist}*\n\n` +
      `👤 *Cliente:* ${bookingName}\n` +
      `📞 *Contato:* ${bookingPhone}\n` +
      `💵 *Valor estimado:* R$ ${totalCost}\n\n` +
      `Vim através do site e gostaria de confirmar esse horário!`;

    const encoded = encodeURIComponent(messageText);
    const apiLink = `https://api.whatsapp.com/send?phone=5521965068219&text=${encoded}`;
    
    setGeneratedWhatsAppLink(apiLink);
    setBookingFinalSuccess(true);
  };

  // Quick helper to convert selected services to total price
  const getBookingTotal = () => {
    return services
      .filter(s => bookingServicesSelected.includes(s.id))
      .reduce((acc, curr) => acc + curr.price, 0);
  };

  // Direct offer wizard launch
  const handleClaimOffer = () => {
    setBookingServicesSelected(['paredao2h']); // paredao2h is default premium
    setBookingSpecialist('Renata Mendes');
    setIsBookingOpen(true);
    setBookingStep(1);
  };

  return (
    <div id="prime-broze-app-container" className="w-full min-h-screen bg-dark-bg text-[#F3F4F6] font-sans antialiased selection:bg-[#C5A059] selection:text-[#0F0D0B] flex flex-col justify-between">
      
      {/* Top Header */}
      <header id="prime-broze-header" className="sticky top-0 z-40 bg-dark-bg/95 backdrop-blur px-4 sm:px-8 lg:px-12 py-4 border-b border-[#C5A059]/15 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C5A059] to-[#8E6F3E] flex items-center justify-center shadow-lg shadow-[#C5A059]/10">
            <span className="text-[#0F0D0B] font-serif font-bold italic text-2xl tracking-tighter">P</span>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif tracking-[0.25em] text-[#C5A059] font-medium leading-none">PRIME BROZE</h1>
            <span className="text-[9px] uppercase tracking-[0.4em] text-[#A1A1AA]">Luxury Bronze & Spa</span>
          </div>
        </div>

        {/* Dynamic Navigation Tabbing */}
        <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-xs uppercase tracking-widest font-medium text-[#A1A1AA]">
          <button 
            id="nav-services-btn"
            onClick={() => setActiveTab('services')}
            className={`px-3 py-1.5 rounded-md transition-all duration-300 ${activeTab === 'services' ? 'bg-[#C5A059]/10 text-[#C5A059] font-bold border-b-2 border-[#C5A059]' : 'hover:text-[#C5A059] hover:bg-[#C5A059]/5'}`}
          >
            Serviços
          </button>
          <button 
            id="nav-gallery-btn"
            onClick={() => setActiveTab('gallery')}
            className={`px-3 py-1.5 rounded-md transition-all duration-300 ${activeTab === 'gallery' ? 'bg-[#C5A059]/10 text-[#C5A059] font-bold border-b-2 border-[#C5A059]' : 'hover:text-[#C5A059] hover:bg-[#C5A059]/5'}`}
          >
            Galeria @Instagram
          </button>
          <button 
            id="nav-promo-btn"
            onClick={() => setActiveTab('promotions')}
            className={`px-3 py-1.5 rounded-md transition-all duration-300 ${activeTab === 'promotions' ? 'bg-[#C5A059]/10 text-[#C5A059] font-bold border-b-2 border-[#C5A059]' : 'hover:text-[#C5A059] hover:bg-[#C5A059]/5'}`}
          >
            Clube Fidelidade
          </button>
          <button 
            id="nav-reviews-btn"
            onClick={() => setActiveTab('reviews')}
            className={`px-3 py-1.5 rounded-md transition-all duration-300 ${activeTab === 'reviews' ? 'bg-[#C5A059]/10 text-[#C5A059] font-bold border-b-2 border-[#C5A059]' : 'hover:text-[#C5A059] hover:bg-[#C5A059]/5'}`}
          >
            Depoimentos
          </button>
        </nav>

        {/* Dynamic Booking CTA Trigger */}
        <button 
          id="header-cta-book-btn"
          onClick={() => { setIsBookingOpen(true); setBookingStep(1); setBookingFinalSuccess(false); }}
          className="bg-gradient-to-r from-[#C5A059] to-[#8E6F3E] hover:from-[#E5C483] hover:to-[#C5A059] text-[#0F0D0B] px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md shadow-[#C5A059]/10 flex items-center gap-2"
        >
          <CalendarDays size={14} />
          Agendar Sessão
        </button>
      </header>

      {/* Main Body Grid */}
      <main className="flex-1 flex flex-col lg:flex-row">
        
        {/* Left Side Section - Always Present, Brand Focus + Interactive Selector */}
        <section id="brand-splash-col" className="w-full lg:w-[42%] p-6 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-[#C5A059]/10 flex flex-col justify-between bg-dark-bg/40">
          <div className="space-y-6 lg:my-auto">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-[#C5A059]/10 border border-[#C5A059]/30 rounded-full py-1 px-3 text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A059]">
              <Sparkles size={11} className="animate-pulse" />
               Bronzeado Seguro & Exclusivo
            </div>

            {/* Core Message Header */}
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-tight tracking-wide">
                O Bronze Perfeito <br />
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#E5C483] luxury-text-glow">
                  Em Qualquer Estação
                </span>
              </h2>
            </div>
            
            <p className="text-[#A1A1AA] text-sm sm:text-base leading-relaxed max-w-md">
              Tecnologia inovadora de bronzeamento rápido em cabines verticais de Paredão Duplo de alta intensidade. Conquiste a marquinha de fita perfeita e pelos douradíssimos com segurança plena, de forma eficiente e confortável.
            </p>

            {/* Services Quick Selection list */}
            <div className="space-y-3 mt-6">
              <h3 className="text-xs uppercase tracking-widest text-[#71717A] font-semibold flex items-center gap-2">
                <Sparkle size={12} className="text-[#C5A059]" /> Menu Rápido de Sessões (Selecione para ver detalhes)
              </h3>
              
              <div className="grid grid-cols-1 gap-3">
                {services.map((srv) => (
                  <button
                    key={srv.id}
                    id={`quick-service-row-${srv.id}`}
                    onClick={() => {
                        setSelectedService(srv);
                        setActiveTab('services'); // Redirect tab internally to show details
                    }}
                    className={`flex justify-between items-center p-3.5 rounded-lg border text-left transition-all duration-300 transform ${
                      selectedService.id === srv.id 
                        ? 'bg-[#1C1917]/90 border-[#C5A059] bg-gradient-to-r from-[#1C1917] to-[#0A0908] translate-x-2'
                        : 'bg-[#12100E] border-[#C5A059]/10 hover:border-[#C5A059]/40 hover:bg-[#181512]/60'
                    }`}
                  >
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-[#F3F4F6] tracking-wide">{srv.name}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          srv.tier === 'Exclusivo' ? 'bg-[#C5A059]/20 text-[#C5A059]' : 
                          srv.tier === 'Premium' ? 'bg-[#8E6F3E]/20 text-[#E5C483]' : 'bg-[#71717A]/10 text-[#A1A1AA]'
                        }`}>
                          {srv.tier}
                        </span>
                      </div>
                      <span className="text-xs text-[#71717A] line-clamp-1">{srv.shortDesc}</span>
                    </div>
                    
                    <div className="text-right flex flex-col justify-center items-end shrink-0">
                      <span className="text-[15px] font-serif font-semibold text-[#C5A059] luxury-text-glow">R$ {srv.price}</span>
                      <span className="text-[10px] text-[#A1A1AA] flex items-center gap-1">
                        <Clock size={10} /> {srv.duration}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Contact Micro-Row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#71717A] pt-4 border-t border-[#C5A059]/10">
              <span className="flex items-center gap-1.5"><MapPin size={12} className="text-[#C5A059]" /> Rua Guaratá, 30 - Mesquita, RJ</span>
              <span className="flex items-center gap-1.5"><Phone size={12} className="text-[#C5A059]" /> (21) 96506-8219</span>
            </div>
          </div>

          {/* Core Brand Badge */}
          <div className="mt-8 border-t border-[#C5A059]/10 pt-4 hidden lg:flex items-center justify-between">
            <span className="text-[10px] text-[#71717A] tracking-widest uppercase">Certificado Anvisa</span>
            <span className="text-[10px] text-[#71717A] tracking-widest uppercase">Fórmulas Veganas</span>
            <span className="text-[10px] text-[#C5A059] tracking-widest uppercase font-semibold">★ ★ ★ ★ ★ 5.0</span>
          </div>
        </section>

        {/* Right Side Column - Houses interactive tab views */}
        <section id="reactive-panels" className="w-full lg:w-[58%] p-6 sm:p-10 lg:p-12 bg-dark-deep/90 flex flex-col justify-between overflow-y-auto min-h-[500px]">
          
          {/* TAB 1: SERVICES DETAIL VIEW */}
          {activeTab === 'services' && (
            <div id="services-details-pane" className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center border-b border-[#C5A059]/15 pb-4">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A059]">Detalhes do Tratamento</span>
                <span className="text-xs text-[#A1A1AA] italic">Visualizando ficha técnica corporativa</span>
              </div>

              {/* Fases do Bronzeamento Protocol - Image 1 */}
              <div className="bg-[#12100E] border border-[#C5A059]/20 p-4 rounded-xl space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-[#C5A059]/10">
                  <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-widest flex items-center gap-1.5 font-serif">
                    ✨ Protocolo de 4 Sessões Prime Bronze
                  </h4>
                  <span className="text-[9px] text-[#71717A] uppercase tracking-widest font-mono">Tratamento Completo</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-lg bg-[#0F0D0B] border border-[#C5A059]/10 space-y-1 hover:border-[#C5A059]/30 transition-colors">
                    <span className="block text-[8px] text-[#C5A059] font-bold font-mono tracking-widest uppercase">1ª Sessão</span>
                    <strong className="block text-xs text-[#F3F4F6] uppercase tracking-wider font-bold">Desenha</strong>
                    <p className="text-[9px] text-[#71717A] leading-normal">Cria o contorno perfeito do seu biquíni de fita adesiva.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0F0D0B] border border-[#C5A059]/10 space-y-1 hover:border-[#C5A059]/30 transition-colors">
                    <span className="block text-[8px] text-[#C5A059] font-bold font-mono tracking-widest uppercase">2ª Sessão</span>
                    <strong className="block text-xs text-[#F3F4F6] uppercase tracking-wider font-bold">Corrige</strong>
                    <p className="text-[9px] text-[#71717A] leading-normal">Ajusta simetria e preenche imperfeições de tom no corpo.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0F0D0B] border border-[#C5A059]/10 space-y-1 hover:border-[#C5A059]/30 transition-colors">
                    <span className="block text-[8px] text-[#C5A059] font-bold font-mono tracking-widest uppercase">3ª Sessão</span>
                    <strong className="block text-xs text-[#F3F4F6] uppercase tracking-wider font-bold">Define</strong>
                    <p className="text-[9px] text-[#71717A] leading-normal">Intensifica e fixa a marquinha com contraste radiante.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#181512] border border-[#C5A059]/35 space-y-1 shadow-lg shadow-[#C5A059]/5">
                    <span className="inline-block text-[8px] font-bold font-mono tracking-widest uppercase bg-[#C5A059]/15 text-[#C5A059] px-1.5 py-0.5 rounded">4ª Sessão</span>
                    <strong className="block text-xs text-[#C5A059] uppercase tracking-wider font-extrabold">Pigmenta</strong>
                    <p className="text-[9px] text-[#71717A] leading-normal">Alcança a tonalidade dourada máxima definitiva e duradoura.</p>
                  </div>
                </div>
              </div>

              {/* Focus treatment big layout */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#C5A059] font-bold uppercase tracking-widest">
                    <StarsDecor /> {selectedService.tier} PRIME BROZE LINE
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-serif text-[#F3F4F6]">{selectedService.name}</h3>
                  <div className="flex flex-wrap gap-4 text-xs text-[#A1A1AA] pt-1">
                    <span className="flex items-center gap-1 bg-dark-card/50 px-2 py-1 rounded border border-[#C5A059]/10">
                      <Clock size={12} className="text-[#C5A059]" /> Sessão: <strong>{selectedService.duration}</strong>
                    </span>
                    <span className="flex items-center gap-1 bg-dark-card/50 px-2 py-1 rounded border border-[#C5A059]/10 font-serif">
                      Valor integral: <strong className="text-[#C5A059]">R$ {selectedService.price}</strong>
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-2xl text-justify">
                  {selectedService.fullDesc}
                </p>

                {/* Benefits / Features List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-[#12100E] border border-[#C5A059]/10 rounded-lg p-4 space-y-3">
                    <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-widest flex items-center gap-1.5 border-b border-[#C5A059]/10 pb-2">
                      <CheckCircle2 size={13} /> Vantagens Prime Broze
                    </h4>
                    <ul className="space-y-2.5 text-xs text-[#A1A1AA]">
                      {selectedService.benefits.map((ben, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check size={12} className="text-[#C5A059] shrink-0 mt-0.5" />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#12100E] border border-[#C5A059]/10 rounded-lg p-4 space-y-3">
                    <h4 className="text-xs font-bold text-[#E5C483] uppercase tracking-widest flex items-center gap-1.5 border-b border-[#C5A059]/10 pb-2">
                      <Info size={13} /> Preparo Necessário
                    </h4>
                    <ul className="space-y-2.5 text-xs text-[#A1A1AA]">
                      {selectedService.prep.map((pr, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full shrink-0 mt-1.5"></div>
                          <span>{pr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Aftercare Card */}
                <div className="bg-[#1C1917]/30 border border-[#C5A059]/20 border-dashed rounded-lg p-4 space-y-2">
                  <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-widest flex items-center gap-1">
                    <Award size={13} /> Cuidados Pós-Sessão (Manutenção do Brilho)
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#A1A1AA]">
                    {selectedService.aftercare.map((care, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check size={12} className="text-[#C5A059] shrink-0 mt-1" />
                        <span>{care}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Action triggers */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    id="action-book-selected"
                    onClick={() => {
                      setBookingServicesSelected([selectedService.id]);
                      setBookingStep(1);
                      setBookingFinalSuccess(false);
                      setIsBookingOpen(true);
                    }}
                    className="flex-1 bg-[#C5A059] hover:bg-[#A6864A] text-[#0F0D0B] text-center font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-widest transition-all duration-300"
                  >
                    Agendar Horário com {selectedService.name}
                  </button>
                  <button
                    id="action-tab-calculator"
                    onClick={() => {
                      setCalcSessionsNum(5);
                      setActiveTab('promotions');
                    }}
                    className="border border-[#C5A059]/40 hover:border-[#C5A059]/90 text-[#C5A059] px-6 py-3 rounded-lg text-xs uppercase tracking-widest transition-all duration-300 bg-[#C5A059]/5 hover:bg-[#C5A059]/10"
                  >
                    Ver Pacotes & Descontos
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INSTAGRAM GALLERY PLACE */}
          {activeTab === 'gallery' && (
            <div id="gallery-pane" className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center border-b border-[#C5A059]/15 pb-4">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-[#A1A1AA] font-semibold">Feed de Inspirações</h3>
                  <a 
                    href="https://instagram.com/primebroze_luxury" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#C5A059] text-xs font-serif font-medium underline inline-flex items-center gap-1 hover:text-[#E3C28D]"
                  >
                    @primebroze_luxury <Instagram size={12} />
                  </a>
                </div>
                <span className="text-[10px] text-[#71717A] tracking-wider uppercase bg-[#1C1917] px-3 py-1 rounded-full">Explore as fotos dos clientes</span>
              </div>

              {/* Dynamic Insta Post Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {instaPosts.map((post) => (
                  <div
                    key={post.id}
                    id={`insta-card-${post.id}`}
                    onClick={() => setActiveLightboxPost(post)}
                    className="bg-[#12100E] border border-[#C5A059]/10 rounded-xl overflow-hidden relative group cursor-pointer hover:border-[#C5A059]/40 transition-all duration-300 transform hover:-translate-y-1 block hover:shadow-lg hover:shadow-[#C5A059]/5"
                  >
                    {/* Simulated High-End Image */}
                    <div className={`w-full aspect-square bg-gradient-to-tr ${post.imageColor} relative flex items-center justify-center border-b border-[#C5A059]/10 overflow-hidden`}>
                      {/* Gold Luxury Shimmer Background Pattern */}
                      <span className="text-[#C5A059]/20 text-5xl transform group-hover:scale-110 transition-transform duration-500">📷</span>
                      
                      <div className="absolute top-2 left-2 bg-[#0F0D0B]/80 text-[#C5A059] text-[9px] px-2 py-0.5 rounded-full border border-[#C5A059]/20 font-mono tracking-widest">
                        #{post.tag}
                      </div>

                      {/* Floating details icon overlay */}
                      <div className="absolute inset-0 bg-[#0F0D0B]/85 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                        <span className="text-[10px] text-[#A1A1AA] font-mono">{post.username}</span>
                        <p className="text-xs text-[#F3F4F6] font-serif line-clamp-3 italic">"{post.caption}"</p>
                        <span className="text-[10px] text-[#C5A059] uppercase tracking-widest underline pt-1">Ver ampliado & Detalhes</span>
                      </div>
                    </div>

                    {/* Likes & Interactions Area */}
                    <div className="p-3 flex items-center justify-between text-xs text-[#A1A1AA]">
                      <div className="flex items-center gap-3">
                        <button
                          id={`like-btn-post-${post.id}`}
                          onClick={(e) => handleLikePost(post.id, e)}
                          className="flex items-center gap-1.5 hover:text-red-400 group/heart text-[#71717A] transition-colors"
                          title="Curtir postagem"
                        >
                          <Heart size={14} className="group-hover/heart:fill-red-400 group-hover/heart:text-red-400 transition-all text-rose-500 fill-rose-500" />
                          <span className="text-[#F3F4F6] font-mono">{post.likes}</span>
                        </button>
                        <span className="flex items-center gap-1.5">
                          <MessageCircle size={14} className="text-[#C5A059]" />
                          <span className="font-mono text-[#F3F4F6]">{post.commentsCount}</span>
                        </span>
                      </div>
                      <span className="text-[10px] text-[#71717A] font-mono">São Paulo</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Special interactive prompt for user to feel engaged */}
              <div className="bg-[#1C1917]/50 border border-[#C5A059]/20 rounded-xl p-5 text-center space-y-3">
                <h4 className="text-sm font-serif text-[#F3F4F6] italic">Quer ver o seu brilho estampado aqui?</h4>
                <p className="text-xs text-[#A1A1AA] max-w-lg mx-auto">
                  Poste a sua foto após a sessão com a hashtag <span className="text-[#C5A059] font-mono">#PrimeBroze</span> e mencione nosso perfil. Nossos clientes ganham tratamento vip surpresa na visita subsequente!
                </p>
                <button 
                  onClick={() => {
                    alert('Simulação de compartilhamento social ativa! Ao postar marque @primebroze_luxury s2');
                  }}
                  className="border border-[#C5A059]/30 hover:border-[#C5A059] text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-full text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0F0D0B] transition-all duration-300"
                >
                  Marcar no Instagram
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: PROMOTIONS CLUB FIDELIDADE CALCULATOR */}
          {activeTab === 'promotions' && (
            <div id="promotions-pane" className="space-y-6 animate-fadeIn">
              
              {/* Header Promo Banner */}
              <div className="bg-gradient-to-r from-[#C5A059]/10 to-[#8E6F3E]/20 border border-[#C5A059]/30 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute right-4 top-4 text-[#C5A059]/10 text-8xl font-serif select-none pointer-events-none">6ª</div>
                <div className="space-y-2 max-w-md">
                  <span className="bg-[#C5A059] text-[#0F0D0B] font-mono text-[9px] font-bold px-2 py-0.5 rounded-full tracking-widest uppercase">Oferta de Inverno & Primavera</span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#F3F4F6] italic leading-tight">Leve 5 sessões, ganhe a 6ª inteiramente grátis!</h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    Compre o pacote antecipado de qualquer serviço do menu e ganhe uma sessão extra completa de presente de fidelização. Válido por 12 meses após a adesão.
                  </p>
                  <button 
                    id="claim-offer-fidelidade-btn"
                    onClick={handleClaimOffer}
                    className="mt-2 bg-[#C5A059] hover:bg-[#A6864A] text-[#0F0D0B] font-bold font-mono px-5 py-2 rounded-lg text-[10px] uppercase tracking-widest transition-colors shadow-lg"
                  >
                    Garantir Oferta Agora
                  </button>
                </div>
              </div>

              {/* Interactive Loyalty & Budget Calculator Section */}
              <div className="bg-[#12100E] border border-[#C5A059]/15 rounded-xl p-5 sm:p-6 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-widest flex items-center gap-2">
                    <Sliders size={14} /> Simulador de Pacote Personalizado
                  </h4>
                  <p className="text-xs text-[#71717A] mt-1">Configure o seu pacote ideal e descubra as vantagens financeiras exclusivas Prime Broze</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Controls column */}
                  <div className="space-y-5">
                    {/* Choose treat reference */}
                    <div className="space-y-2">
                      <label className="text-xs text-[#A1A1AA] font-medium block">1. Serviço Base Selecionado:</label>
                      <select
                        id="calc-service-select"
                        value={selectedService.id}
                        onChange={(e) => {
                          const found = services.find(s => s.id === e.target.value);
                          if (found) setSelectedService(found);
                        }}
                        className="w-full bg-[#0F0D0B] border border-[#C5A059]/20 text-[#F3F4F6] p-2.5 rounded-lg text-xs tracking-wider outline-none focus:border-[#C5A059]"
                      >
                        {services.map(s => (
                          <option key={s.id} value={s.id}>{s.name} - R$ {s.price}</option>
                        ))}
                      </select>
                    </div>

                    {/* Sessions Slider Selector */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#A1A1AA] font-medium">2. Quantidade de Sessões:</span>
                        <span className="text-[#C5A059] font-bold text-sm bg-[#C5A059]/10 px-2.5 py-0.5 rounded font-mono">{calcSessionsNum} sessões</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        value={calcSessionsNum} 
                        onChange={(e) => setCalcSessionsNum(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-[#1C1917] rounded-lg appearance-none cursor-pointer accent-[#C5A059]" 
                      />
                      <div className="flex justify-between text-[10px] text-[#71717A]">
                        <span>1 sessão</span>
                        <span className="text-[#C5A059]">Pacotes (5+ ganham 1 bônus)</span>
                        <span>10 sessões</span>
                      </div>
                    </div>

                    {/* Upgrades List */}
                    <div className="space-y-3 pt-1">
                      <span className="text-xs text-[#A1A1AA] font-medium block">3. Upgrades Adicionais por Sessão:</span>
                      
                      <label className="flex items-center gap-3 bg-[#0F0D0B] p-2.5 rounded-lg border border-[#C5A059]/10 hover:border-[#C5A059]/25 cursor-pointer text-xs">
                        <input
                          type="checkbox"
                          checked={calcAddEsfoliacao}
                          onChange={(e) => setCalcAddEsfoliacao(e.target.checked)}
                          className="rounded border-[#C5A059]/40 text-[#C5A059] focus:ring-0 accent-[#C5A059]"
                        />
                        <div className="flex-1">
                          <span className="block text-xs font-semibold text-[#F3F4F6]">Gomagem Esfoliante Phyto (+R$ 40/sessão)</span>
                          <span className="text-[10px] text-[#71717A] block">Prepara a derme para fixação dupla</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 bg-[#0F0D0B] p-2.5 rounded-lg border border-[#C5A059]/10 hover:border-[#C5A059]/25 cursor-pointer text-xs">
                        <input
                          type="checkbox"
                          checked={calcAddFacial}
                          onChange={(e) => setCalcAddFacial(e.target.checked)}
                          className="rounded border-[#C5A059]/40 text-[#C5A059] focus:ring-0 accent-[#C5A059]"
                        />
                        <div className="flex-1">
                          <span className="block text-xs font-semibold text-[#F3F4F6]">Bruma Hidratante Facial (+R$ 60/sessão)</span>
                          <span className="text-[10px] text-[#71717A] block">Toque dourado saudável e antioxidante facial</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Calculations Display Receipt-style column */}
                  <div className="bg-[#0F0D0B] border border-[#C5A059]/20 rounded-xl p-4 flex flex-col justify-between">
                    <div className="space-y-3.5">
                      <div className="text-center pb-2 border-b border-[#C5A059]/10">
                        <span className="text-[10px] uppercase tracking-widest text-[#71717A] block">Orçamento Estimado</span>
                        <span className="text-base font-serif text-[#C5A566] tracking-wide">Plano Custom Prime Broze</span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-[#A1A1AA]">{calcSessionsNum}x {selectedService.name}</span>
                          <span className="text-[#F3F4F6] font-mono">R$ {calcBaseTotal}</span>
                        </div>

                        {calcSessionsNum >= 5 && (
                          <div className="flex justify-between text-emerald-400 bg-emerald-950/20 px-2 py-1 rounded border border-emerald-900/20">
                            <span className="flex items-center gap-1">🎟️ Bônus Fidelidade Prime Broze (Sessão Grátis)</span>
                            <span className="font-mono">-R$ {calcPromoDiscount}</span>
                          </div>
                        )}

                        {calcAddEsfoliacao && (
                          <div className="flex justify-between">
                            <span className="text-[#A1A1AA]">Upgrade Esfoliante ({calcSessionsNum}x)</span>
                            <span className="text-[#F3F4F6] font-mono">R$ {calcEsfoliacaoCost}</span>
                          </div>
                        )}

                        {calcAddFacial && (
                          <div className="flex justify-between">
                            <span className="text-[#A1A1AA]">Upgrade Facial ({calcSessionsNum}x)</span>
                            <span className="text-[#F3F4F6] font-mono">R$ {calcFacialCost}</span>
                          </div>
                        )}

                        {isCouponVerified && (
                          <div className="flex justify-between text-yellow-400 bg-yellow-950/20 px-2 py-1 rounded border border-yellow-900/20">
                            <span>Desconto Cupom PRIME10</span>
                            <span className="font-mono">-10%</span>
                          </div>
                        )}
                      </div>

                      {/* Coupon implementation */}
                      <div className="pt-2 border-t border-[#C5A059]/10">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Insira cupom (ex: PRIME10)"
                            value={calcAppliedCoupon}
                            onChange={(e) => setCalcAppliedCoupon(e.target.value)}
                            className="flex-1 bg-[#12100E] border border-[#C5A059]/20 text-[#F3F4F6] text-xs px-2.5 py-1.5 rounded outline-none focus:border-[#C5A059] placeholder-[#71717A]"
                          />
                          <button
                            id="apply-coupon-calc-btn"
                            onClick={handleApplyCalcCoupon}
                            className="bg-[#C5A059] text-[#0F0D0B] text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded hover:bg-[#A6864A]"
                          >
                            Aplicar
                          </button>
                        </div>
                        {calculatorMessage && (
                          <p className={`text-[10px] mt-1.5 ${isCouponVerified ? 'text-emerald-400' : 'text-rose-400'}`}>{calculatorMessage}</p>
                        )}
                      </div>
                    </div>

                    {/* Footer total bill info */}
                    <div className="pt-4 border-t border-[#C5A059]/15 mt-4 space-y-3">
                      <div className="flex justify-between items-baseline">
                        <span className="text-[#A1A1AA] text-xs uppercase font-bold tracking-widest">Total Líquido:</span>
                        <div className="text-right">
                          <span className="text-2xl font-serif font-semibold text-[#C5A566] luxury-text-glow font-mono">R$ {calcFinalPrice}</span>
                          <span className="text-[9px] block text-[#71717A] text-right">no PIX ou Cartão em até 3x</span>
                        </div>
                      </div>

                      <button
                        id="calculator-buy-intent-btn"
                        onClick={() => {
                          setBookingServicesSelected([selectedService.id]);
                          setBookingCoupon(isCouponVerified ? 'PRIME10' : '');
                          setBookingStep(1);
                          setIsBookingOpen(true);
                        }}
                        className="w-full bg-[#C5A059] hover:bg-[#A6864A] text-[#0F0D0B] py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-center transition-colors block"
                      >
                        Comprar este pacote via WhatsApp
                      </button>
                    </div>
                  </div>
                </div>

                {/* Loyalty Guidelines */}
                <div className="p-4 bg-[#0A0908] rounded-lg border border-[#C5A059]/10">
                  <h5 className="text-[11px] font-bold tracking-widest text-[#E5C483] uppercase mb-2">💡 Dica Prime Broze</h5>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    Você pode dividir o pacote contratado com uma amiga! Basta registrar os dois CPFs no dia da assinatura na clínica Prime Broze. É perfeito para ir acompanhado e garantir a sexta sessão extra gratuita!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CLIENT TESTIMONIALS & ADD REVIEWS */}
          {activeTab === 'reviews' && (
            <div id="reviews-pane" className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center border-b border-[#C5A059]/15 pb-4">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-[#A1A1AA] font-semibold">Vozes Prime Broze Clientes</h3>
                  <p className="text-[10px] text-[#71717A] mt-0.5">Nossos feedbacks corporativos orgânicos</p>
                </div>
                <span className="text-[11px] bg-[#12100E] border border-[#C5A059]/20 px-3 py-1 rounded text-[#C5A059]">Média Geral ★ 5.0 / 5.0</span>
              </div>

              {/* Add live feedback form */}
              <form onSubmit={handleSubmitReview} className="bg-[#12100E] border border-[#C5A059]/10 rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold text-[#E5C483] uppercase tracking-widest border-b border-[#C5A059]/10 pb-2 flex items-center gap-2">
                  <Smile size={14} /> Deixe Seu Depoimento de Brilho
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-[#A1A1AA] font-semibold block">Seu Nome Completo:</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Amanda Alencar"
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      className="w-full bg-[#0F0D0B] border border-[#C5A059]/20 text-[#F3F4F6] text-xs p-2.5 rounded outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-[#A1A1AA] font-semibold block">Sessão Realizada:</label>
                    <select
                      value={newReviewTreatment}
                      onChange={(e) => setNewReviewTreatment(e.target.value)}
                      className="w-full bg-[#0F0D0B] border border-[#C5A059]/20 text-[#F3F4F6] text-xs p-2.5 rounded outline-none focus:border-[#C5A059]"
                    >
                      {services.map(s => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] uppercase tracking-wider text-[#A1A1AA] font-semibold block">Sua Avaliação:</label>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((starValue) => (
                        <button
                          key={starValue}
                          type="button"
                          onClick={() => setNewReviewRating(starValue)}
                          className="hover:scale-125 transition-transform"
                          title={`Avaliar com ${starValue} estrela(s)`}
                        >
                          <Star 
                            size={16} 
                            className={starValue <= newReviewRating ? 'text-[#C5A059] fill-[#C5A059]' : 'text-[#71717A]'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-[#A1A1AA] font-semibold block">Comentário / Experiência:</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Conte como foi sua experiência, o tom do bronze, o preparo..."
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    className="w-full bg-[#0F0D0B] border border-[#C5A059]/20 text-[#F3F4F6] text-xs p-2.5 rounded-lg outline-none focus:border-[#C5A059]"
                  />
                </div>

                <button
                  type="submit"
                  id="submit-review-btn"
                  className="bg-[#C5A059] hover:bg-[#A6864A] text-[#0F0D0B] font-bold font-mono px-6 py-2 rounded-lg text-[10px] uppercase tracking-widest transition-colors w-full sm:w-auto"
                >
                  Publicar Depoimento
                </button>

                {reviewSuccessMsg && (
                  <p className="text-emerald-400 text-xs font-semibold animate-pulse">✨ Seu depoimento foi publicado com sucesso e já está ativo abaixo!</p>
                )}
              </form>

              {/* Feed Reviews List */}
              <div id="reviews-feed-container" className="space-y-4">
                {reviews.map((rev) => (
                  <div 
                    key={rev.id} 
                    className="p-5 bg-dark-card/30 border border-[#C5A059]/10 rounded-xl space-y-2.5 hover:border-[#C5A059]/35 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <span className="font-semibold text-sm text-[#F3F4F6]">{rev.name}</span>
                        <div className="flex gap-1 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              size={12} 
                              className={i < rev.rating ? 'text-[#C5A059] fill-[#C5A059]' : 'text-[#71717A]'} 
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] bg-[#C5A059]/10 text-[#C5A059] px-2 py-0.5 rounded-full border border-[#C5A059]/20">{rev.treatment}</span>
                        <span className="text-[10px] text-[#71717A] block mt-1 font-mono">{rev.date}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#A1A1AA] leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Global CTA promo card inside right panel bottom when not on promotions tab */}
          {activeTab !== 'promotions' && (
            <div id="right-panel-bottom-card" className="mt-8 pt-6 border-t border-[#C5A059]/15 flex flex-col sm:flex-row gap-4 items-center justify-between bg-[#1C1917]/20 p-5 rounded-xl border border-[#C5A059]/10">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] text-[#C5A059] font-bold uppercase tracking-widest">Aproveite Já</span>
                <p className="text-[#F3F4F6] font-serif italic text-base leading-snug">Pacotes com sessão extra grátis válidos até Julho.</p>
              </div>
              <button 
                id="panel-offer-action-btn"
                onClick={() => {
                  setCalcSessionsNum(5);
                  setActiveTab('promotions');
                }}
                className="border border-[#C5A059] text-[#C5A059] px-5 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest hover:bg-[#C5A059] hover:text-[#0F0D0B] transition-colors"
              >
                Garantir Voucher de July
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Persistent Footer */}
      <footer id="prime-broze-footer" className="px-6 sm:px-12 py-6 bg-[#12100E] border-t border-[#C5A059]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-8 text-[10px] text-[#71717A] uppercase tracking-widest">
          <span>📍 Rua Guaratá, 30 - Mesquita, Santa Terezinha</span>
          <span>📞 (21) 96506-8219</span>
          <span>⏰ Seg a Sáb: 09h às 20h</span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-[#A1A1AA] uppercase tracking-widest font-mono">Prime Broze © 2026</span>
          <div className="flex items-center gap-2">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-7 h-7 bg-[#C5A059]/10 rounded-full border border-[#C5A059]/20 flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0F0D0B] transition-all"
            >
              F
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-7 h-7 bg-[#C5A059]/10 rounded-full border border-[#C5A059]/20 flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0F0D0B] transition-all"
            >
              I
            </a>
          </div>
        </div>
      </footer>

      {/* 1. INSTAGRAM VIEW EXTENDED LIGHTBOX MODAL */}
      {activeLightboxPost && (
        <div 
          id="insta-lightbox-modal"
          className="fixed inset-0 z-50 bg-[#0F0D0B]/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveLightboxPost(null)}
        >
          <div 
            className="bg-[#12100E] border border-[#C5A059]/30 rounded-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left simulated photo */}
            <div className={`w-full md:w-1/2 aspect-square md:aspect-auto md:h-[450px] bg-gradient-to-tr ${activeLightboxPost.imageColor} flex items-center justify-center relative`}>
              <span className="text-[#C5A059]/20 text-7xl select-none">📷</span>
              <div className="absolute top-4 left-4 bg-[#0F0D0B]/75 text-[#C5A059] border border-[#C5A059]/20 rounded-full px-3 py-1 text-xs font-mono">
                #{activeLightboxPost.tag}
              </div>
            </div>

            {/* Right info details */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between h-[450px] bg-dark-deep">
              <div className="space-y-4 overflow-y-auto pr-1">
                {/* User avatar header */}
                <div className="flex items-center justify-between border-b border-[#C5A059]/15 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#C5A059] to-[#8E6F3E] flex items-center justify-center font-bold text-xs text-[#0F0D0B]">S</div>
                    <span className="text-xs font-semibold text-[#F3F4F6] font-mono">{activeLightboxPost.username}</span>
                  </div>
                  <button 
                    onClick={() => setActiveLightboxPost(null)}
                    className="text-[#71717A] hover:text-[#C5A059]"
                    title="Fechar Lightbox"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Caption / Comments */}
                <div className="space-y-3">
                  <p className="text-xs text-[#A1A1AA] leading-relaxed italic">
                    "{activeLightboxPost.caption}"
                  </p>
                  
                  {/* Commments thread */}
                  <div className="space-y-2 border-t border-[#C5A059]/10 pt-3">
                    <span className="text-[10px] uppercase font-bold text-[#C5A059] block tracking-widest">Comentários</span>
                    <div className="space-y-1.5 max-h-[160px] overflow-y-auto">
                      {(galleryCommentsList[activeLightboxPost.id] || []).map((comm, idx) => (
                        <div key={idx} className="text-[11px] text-[#A1A1AA] bg-dark-card/50 p-2 rounded border border-[#C5A059]/5">
                          <strong className="text-[#F3F4F6] font-mono mr-1">@cliente:</strong> {comm}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom add comments section */}
              <div className="pt-3 border-t border-[#C5A059]/15 space-y-3">
                <div className="flex justify-between text-xs text-[#71717A]">
                  <button 
                    id="lightbox-direct-like-btn"
                    onClick={(e) => handleLikePost(activeLightboxPost.id, e)}
                    className="flex items-center gap-1 hover:text-red-400 group/heart text-rose-500 fill-rose-500"
                  >
                    <Heart size={14} className="group-hover/heart:fill-red-400" /> 
                    <span className="text-[#F3F4F6] font-mono">{activeLightboxPost.likes} curtidas</span>
                  </button>
                  <span className="font-mono">{activeLightboxPost.commentsCount} comentários</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Escreva um comentário..."
                    value={galleryCommentText[activeLightboxPost.id] || ''}
                    onChange={(e) => setGalleryCommentText({ ...galleryCommentText, [activeLightboxPost.id]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddGalleryComment(activeLightboxPost.id);
                    }}
                    className="flex-1 bg-[#12100E] border border-[#C5A059]/20 text-xs text-[#F3F4F6] px-2.5 py-1.5 rounded outline-none focus:border-[#C5A059]"
                  />
                  <button
                    id="lightbox-add-comment-btn"
                    onClick={() => handleAddGalleryComment(activeLightboxPost.id)}
                    className="bg-[#C5A059] text-[#0F0D0B] p-2 rounded hover:bg-[#A6864A]"
                    title="Enviar Comentário"
                  >
                    <Send size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. DYNAMIC wizard MODAL - SCHEDULING WIZARD */}
      {isBookingOpen && (
        <div id="booking-wizard-modal" className="fixed inset-0 z-50 bg-[#0F0D0B]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12100E] border border-[#C5A059]/30 rounded-2xl w-full max-w-lg overflow-hidden flex flex-col luxury-glow">
            
            {/* Header step guide */}
            <div className="bg-gradient-to-r from-[#1C1917] to-[#0A0908] px-6 py-4 border-b border-[#C5A059]/15 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#C5A059] uppercase tracking-widest flex items-center gap-2">
                  <StarsDecor /> Concierge Agendamentos Prime Broze
                </h3>
                <span className="text-[10px] text-[#71717A] block">Processo de Confirmação em 4 passos rápidos</span>
              </div>
              <button 
                onClick={() => setIsBookingOpen(false)}
                className="text-[#71717A] hover:text-[#C5A059] p-1 rounded-full hover:bg-[#1C1917]"
                title="Fechar formulário de agendamento"
              >
                <X size={18} />
              </button>
            </div>

            {/* Steps indicator bar */}
            {!bookingFinalSuccess && (
              <div className="flex bg-[#0A0908] px-6 py-2.5 border-b border-[#C5A059]/10 text-[9px] uppercase tracking-widest font-mono text-center">
                <span className={`flex-1 ${bookingStep === 1 ? 'text-[#C5A059] font-bold' : 'text-[#71717A]'}`}>1. Serviços</span>
                <span className="text-[#C5A059]/30">/</span>
                <span className={`flex-1 ${bookingStep === 2 ? 'text-[#C5A059] font-bold' : 'text-[#71717A]'}`}>2. Especialista</span>
                <span className="text-[#C5A059]/30">/</span>
                <span className={`flex-1 ${bookingStep === 3 ? 'text-[#C5A059] font-bold' : 'text-[#71717A]'}`}>3. Agenda</span>
                <span className="text-[#C5A059]/30">/</span>
                <span className={`flex-1 ${bookingStep === 4 ? 'text-[#C5A059] font-bold' : 'text-[#71717A]'}`}>4. Dados</span>
              </div>
            )}

            {/* Inner dynamic content form */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {bookingFinalSuccess ? (
                /* Success screen */
                <div className="text-center space-y-4 py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/20 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto text-3xl">
                    ✓
                  </div>
                  <h4 className="text-xl font-serif text-[#F3F4F6]">Pré-Agendamento Concluído!</h4>
                  <p className="text-xs text-[#A1A1AA] max-w-xs mx-auto leading-relaxed">
                    Seus dados de preferência e horário foram salvos. Para finalizar e garantir sua cadeira prioritária no salão Prime Broze, envie os dados via WhatsApp agora!
                  </p>
                  
                  <div className="bg-[#0F0D0B] p-4 rounded-xl border border-[#C5A059]/10 text-left space-y-2 text-xs max-w-sm mx-auto">
                    <span className="text-[10px] uppercase font-bold text-[#C5A059] tracking-wider block border-b border-[#C5A059]/10 pb-1.5">Resumo do Ticket</span>
                    <div><span className="text-[#71717A]">Atendimento:</span> <span className="text-[#F3F4F6] font-medium">{bookingName}</span></div>
                    <div><span className="text-[#71717A]">Serviço:</span> <span className="text-[#F3F4F6] font-medium">
                      {services.filter(s => bookingServicesSelected.includes(s.id)).map(s => s.name).join(', ')}
                    </span></div>
                    <div><span className="text-[#71717A]">Data & Hora:</span> <span className="text-[#F3F4F6] font-medium">{bookingDate} às {bookingTime}</span></div>
                    <div><span className="text-[#71717A]">Especialista:</span> <span className="text-[#F3F4F6] font-medium">{bookingSpecialist}</span></div>
                    <div className="pt-1.5 border-t border-[#C5A059]/10 flex justify-between">
                      <span className="text-[#C5A059] font-bold">Valor Estimado:</span>
                      <span className="text-[#C5A059] font-bold font-mono">R$ {getBookingTotal()}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={generatedWhatsAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-widest inline-flex items-center gap-2 transition-transform transform hover:scale-105"
                    >
                      <span>WhatsApp Enviar Agendamento</span>
                    </a>
                    <span className="block text-[10px] text-[#71717A] mt-2">Clique para iniciar o chat e enviar a mensagem pré-configurada</span>
                  </div>
                </div>
              ) : (
                /* Step-by-Step interactive process */
                <form onSubmit={executeBooking} className="space-y-5">
                  
                  {/* STEP 1: SERVICES SELECTOR */}
                  {bookingStep === 1 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-[#E5C483] uppercase tracking-widest">Escolha um ou mais Procedimentos:</h4>
                      <div className="space-y-2.5">
                        {services.map(s => {
                          const isSelected = bookingServicesSelected.includes(s.id);
                          return (
                            <button
                              type="button"
                              key={s.id}
                              onClick={() => handleToggleBookingService(s.id)}
                              className={`w-full p-3 rounded-lg border text-left transition-all duration-300 flex justify-between items-center ${
                                isSelected 
                                  ? 'bg-[#C5A059]/10 border-[#C5A059] text-[#F3F4F6]' 
                                  : 'bg-[#0F0D0B] border-[#C5A059]/10 hover:border-[#C5A059]/20 text-[#A1A1AA]'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 ${
                                  isSelected ? 'bg-[#C5A059] border-[#C5A059]' : 'border-[#C5A059]/20'
                                }`}>
                                  {isSelected && <Check size={12} className="text-black stroke-[3px]" />}
                                </span>
                                <div>
                                  <span className="text-xs font-bold block">{s.name}</span>
                                  <span className="text-[10px] text-[#71717A]">{s.shortDesc}</span>
                                </div>
                              </div>
                              <span className="text-xs font-serif font-bold text-[#C5A059]">R$ {s.price}</span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="bg-[#0A0908] p-3 rounded border border-[#C5A059]/10 flex justify-between items-center mt-4">
                        <span className="text-xs text-[#71717A]">Subtotal Selecionado:</span>
                        <span className="text-sm font-serif font-bold text-[#C5A059]">R$ {getBookingTotal()}</span>
                      </div>

                      <div className="flex justify-end pt-4">
                        <button
                          type="button"
                          onClick={() => setBookingStep(2)}
                          className="bg-[#C5A059] text-black font-bold uppercase tracking-widest text-[10px] px-5 py-2.5 rounded-lg hover:bg-[#A6864A]"
                        >
                          Avançar Especialista
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: STYLIST SELECTOR */}
                  {bookingStep === 2 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-[#E5C483] uppercase tracking-widest">Escolha a Especialista Preferida:</h4>
                      <div className="space-y-2.5">
                        {specialists.map(sp => (
                          <button
                            type="button"
                            key={sp.name}
                            onClick={() => setBookingSpecialist(sp.name)}
                            className={`w-full p-3.5 rounded-lg border text-left transition-all duration-300 flex items-center justify-between ${
                              bookingSpecialist === sp.name 
                                ? 'bg-[#C5A059]/10 border-[#C5A059] text-[#F3F4F6]' 
                                : 'bg-[#0F0D0B] border-[#C5A059]/10 hover:border-[#C5A059]/20 text-[#A1A1AA]'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#C5A059]/30 to-[#8E6F3E]/40 flex items-center justify-center border border-[#C5A059]/20 text-xs text-[#C5A059] font-bold">
                                {sp.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <span className="text-xs font-bold block">{sp.name}</span>
                                <span className="text-[10px] text-[#71717A] block">{sp.role}</span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-[10px] text-yellow-500 flex items-center justify-end gap-0.5">
                                <Star size={11} className="fill-yellow-500" /> {sp.stars}
                              </span>
                              <span className="text-[9px] text-[#71717A] block mt-0.5 font-mono">{sp.reviews} avaliações</span>
                            </div>
                          </button>
                        ))}
                      </div>

                      <div className="flex justify-between pt-4">
                        <button
                          type="button"
                          onClick={() => setBookingStep(1)}
                          className="border border-[#C5A059]/30 text-[#C5A059] font-mono text-[9px] px-4 py-2 rounded uppercase tracking-widest"
                        >
                          Voltar
                        </button>
                        <button
                          type="button"
                          onClick={() => setBookingStep(3)}
                          className="bg-[#C5A059] text-black font-bold uppercase tracking-widest text-[10px] px-5 py-2.5 rounded-lg hover:bg-[#A6864A]"
                        >
                          Avançar para Agenda
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: DATE & TIME SELECTOR */}
                  {bookingStep === 3 && (
                    <div className="space-y-4">
                      {/* Interactive Calendar Selection Row */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-[#E5C483] uppercase tracking-widest">1. Selecione o Dia (Junho 2026):</h4>
                        <div className="grid grid-cols-7 gap-1.5">
                          {calendarDates.map((dateObj) => (
                            <button
                              type="button"
                              key={dateObj.day}
                              disabled={!dateObj.available}
                              onClick={() => setBookingDate(dateObj.dateStr)}
                              className={`p-2 rounded-lg border text-center transition-all ${
                                !dateObj.available ? 'opacity-40 cursor-not-allowed bg-transparent border-[#C5A059]/5 text-[#71717A]' :
                                bookingDate === dateObj.dateStr 
                                  ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#C5A059] font-bold' 
                                  : 'bg-[#0F0D0B] border-[#C5A059]/10 hover:border-[#C5A059]/30 text-[#A1A1AA]'
                              }`}
                            >
                              <span className="text-[8px] uppercase tracking-wider block text-[#71717A] font-semibold">{dateObj.weekday}</span>
                              <span className="text-xs font-mono font-bold block">{dateObj.day}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Time Slot Picker Grid */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-[#E5C483] uppercase tracking-widest">2. Selecione o Horário:</h4>
                        <div className="grid grid-cols-4 gap-2">
                          {timeSlots.map(slot => (
                            <button
                              type="button"
                              key={slot}
                              onClick={() => setBookingTime(slot)}
                              className={`p-2 rounded-lg border text-center text-xs font-mono transition-all ${
                                bookingTime === slot
                                  ? 'bg-[#C5A059] border-[#C5A059] text-black font-bold'
                                  : 'bg-[#0F0D0B] border-[#C5A059]/10 hover:border-[#C5A059]/30 text-[#A1A1AA]'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <button
                          type="button"
                          onClick={() => setBookingStep(2)}
                          className="border border-[#C5A059]/30 text-[#C5A059] font-mono text-[9px] px-4 py-2 rounded uppercase tracking-widest"
                        >
                          Voltar
                        </button>
                        <button
                          type="button"
                          onClick={() => setBookingStep(4)}
                          className="bg-[#C5A059] text-black font-bold uppercase tracking-widest text-[10px] px-5 py-2.5 rounded-lg hover:bg-[#A6864A]"
                        >
                          Avançar Identificação
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: CLIENT IDENTIFICATION FORM */}
                  {bookingStep === 4 && (
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-[#E5C483] uppercase tracking-widest">Informações de Contato Preferencial:</h4>
                      
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-[#A1A1AA] tracking-wider block">Seu Nome Completo:</label>
                          <input
                            type="text"
                            required
                            placeholder="Ex: Clara Silva Mendonça"
                            value={bookingName}
                            onChange={(e) => setBookingName(e.target.value)}
                            className="w-full bg-[#0F0D0B] border border-[#C5A059]/20 text-[#F3F4F6] text-xs p-2.5 rounded outline-none focus:border-[#C5A059]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-[#A1A1AA] tracking-wider block">Seu WhatsApp de Contato:</label>
                          <input
                            type="tel"
                            required
                            placeholder="Ex: (11) 98888-7777"
                            value={bookingPhone}
                            onChange={(e) => setBookingPhone(e.target.value)}
                            className="w-full bg-[#0F0D0B] border border-[#C5A059]/20 text-[#F3F4F6] text-xs p-2.5 rounded outline-none focus:border-[#C5A059]"
                          />
                        </div>

                        {/* Confirmation Box summary */}
                        <div className="bg-[#0F0D0B] p-4 rounded-xl border border-[#C5A059]/15 space-y-1 text-xs">
                          <span className="text-[10px] text-[#C5A059] tracking-wider uppercase font-bold block border-b border-[#C5A059]/10 pb-1.5">Conferência dos Detalhes</span>
                          <p><span className="text-[#71717A]">Serviço de escolha:</span> <span className="font-semibold text-gray-200">
                            {services.filter(s => bookingServicesSelected.includes(s.id)).map(s => s.name).join(', ')}
                          </span></p>
                          <p><span className="text-[#71717A]">Data & Hora marcados:</span> <span className="font-semibold text-gray-200">{bookingDate} às {bookingTime}</span></p>
                          <p><span className="text-[#71717A]">Profissional encarregado:</span> <span className="font-semibold text-gray-200">{bookingSpecialist}</span></p>
                          <div className="pt-2 mt-2 border-t border-[#C5A059]/10 flex justify-between">
                            <span className="text-[#C5A059] font-bold">Total Estimado Prime Broze:</span>
                            <span className="text-[#C5A059] font-bold font-mono text-sm">R$ {getBookingTotal()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <button
                          type="button"
                          onClick={() => setBookingStep(3)}
                          className="border border-[#C5A059]/30 text-[#C5A059] font-mono text-[9px] px-4 py-2 rounded uppercase tracking-widest"
                        >
                          Voltar
                        </button>
                        <button
                          type="submit"
                          id="submit-booking-wizard-btn"
                          className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold uppercase tracking-widest text-[10px] px-6 py-2.5 rounded-lg flex items-center gap-1.5"
                        >
                          Finalizar e Ir para WhatsApp
                        </button>
                      </div>
                    </div>
                  )}

                </form>
              )}
            </div>

            {/* Bottom status of booking model */}
            {!bookingFinalSuccess && (
              <div className="bg-[#0A0908] px-6 py-3 border-t border-[#C5A059]/10 flex justify-between items-center text-[10px] text-[#71717A]">
                <span>💳 Pagamento facilitado na clínica</span>
                <span>🔒 Seus dados estão seguros</span>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

// Minimalist micro components inside to clean up visual clutter
function StarsDecor() {
  return (
    <span className="inline-flex gap-0.5 text-[#C5A059]">
      ✦ ✦
    </span>
  );
}
