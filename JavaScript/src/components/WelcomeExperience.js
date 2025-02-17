const { useState, useEffect } = React;

const styles = {
  radialGradient: {
    background: 'radial-gradient(circle at center, transparent 0%, rgba(28,20,17,0.8) 100%)'
  }
};

const WelcomeExperience = () => {
  const [name, setName] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [currentQuote, setCurrentQuote] = useState('');
  const [weatherMood, setWeatherMood] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('tr');

  const translations = {
    tr: {
      title: "Westeros Krallığı",
      subtitle: "Yedi Krallığın Kapıları",
      placeholder: "Asil İsminizi Yazınız, Leyd/Lord",
      startButton: "Krallığa Giriş",
      welcome: "Hoş Geldiniz",
      backButton: "Krallıktan Ayrıl",
      quotes: [
        "Kış geliyor, ve ölüler onunla geliyor...",
        "Yedi Krallık tek bir kılıcın gölgesinde birleşti.",
        "Tahtların oyununda, ya kazanırsın ya da ölürsün.",
        "Ejderhaların dansı başlıyor..."
      ],
      regions: ['⚔️ Kışyarı', '🏰 Kralıskapı', '🗡️ Casterly Kayası', '🏹 Eyrie']
    },
    de: {
      title: "Königreich Westeros",
      subtitle: "Tore der Sieben Königreiche",
      placeholder: "Geben Sie Ihren edlen Namen ein, Lady/Lord",
      startButton: "Das Reich betreten",
      welcome: "Willkommen",
      backButton: "Reich verlassen",
      quotes: [
        "Der Winter naht, und die Toten kommen mit ihm...",
        "Sieben Königreiche vereint unter einem Schwert.",
        "Im Spiel der Throne gewinnst du oder stirbst.",
        "Der Tanz der Drachen beginnt..."
      ],
      regions: ['⚔️ Winterfell', '🏰 Königsmund', '🗡️ Casterlystein', '🏹 Hohenehr']
    },
    en: {
      title: "Kingdom of Westeros",
      subtitle: "Gates of the Seven Kingdoms",
      placeholder: "Enter Your Noble Name, Lady/Lord",
      startButton: "Enter the Realm",
      welcome: "Welcome",
      backButton: "Leave the Realm",
      quotes: [
        "Winter is coming, and the dead come with it...",
        "Seven Kingdoms united under one sword.",
        "In the game of thrones, you win or you die.",
        "The dance of dragons begins..."
      ],
      regions: ['⚔️ Winterfell', '🏰 King\'s Landing', '🗡️ Casterly Rock', '🏹 The Eyrie']
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (showWelcome) {
      const currentLang = translations[language];
      setCurrentQuote(currentLang.quotes[Math.floor(Math.random() * currentLang.quotes.length)]);
      setWeatherMood(currentLang.regions[Math.floor(Math.random() * currentLang.regions.length)]);
      typeWriter();
    }
  }, [showWelcome, language]);

  useEffect(() => {
    if (audioEnabled) {
      const audio = new Audio('got-theme.mp3');
      audio.loop = true;
      audio.volume = 0.7;
      audio.play().catch(e => console.log('Audio playback failed:', e));
      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [audioEnabled]);

  const typeWriter = async () => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsTyping(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim()) {
      setShowWelcome(true);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => {
      if (prev === 'tr') return 'en';
      if (prev === 'en') return 'de';
      return 'tr';
    });
  };

  const formatTime = () => {
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    
    return (
      <div className="flex items-center justify-center space-x-3">
        <div className="bg-[#2C1810]/80 text-amber-300 px-6 py-4 rounded border border-amber-600/30 font-serif text-2xl backdrop-blur-sm shadow-lg">
          {hour.toString().padStart(2, '0')}
        </div>
        <div className="text-4xl text-amber-600 font-serif animate-pulse">:</div>
        <div className="bg-[#2C1810]/80 text-amber-300 px-6 py-4 rounded border border-amber-600/30 font-serif text-2xl backdrop-blur-sm shadow-lg">
          {minute.toString().padStart(2, '0')}
        </div>
      </div>
    );
  };

  if (!showWelcome) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-[#1C1411] text-[#FFD700]">
        {/* Ana arka plan deseni - Ejderha pulları ve kılıçlar */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8cGF0dGVybiBpZD0iZHJhZ29uU2NhbGVzIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+CiAgICAgIDxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMUMxNDExIi8+CiAgICAgIDxwYXRoIGQ9Ik01MCA1MG0tNDUgMGE0NSw0NSAwIDEsMSA5MCwwYTQ1LDQ1IDAgMSwxIC05MCwwIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjEiLz4KICAgICAgPHBhdGggZD0iTTIwIDIwbDEwIDEwTDIwIDQwbDEwIDEwTDIwIDYwIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjEiLz4KICAgICAgPHBhdGggZD0iTTgwIDIwbC0xMCAxMEw4MCA0MGwtMTAgMTBMODAgNjAiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2U9IiNGRkQ3MDAiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuMSIvPgogICAgICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIzIiBmaWxsPSIjRkZENzAwIiBvcGFjaXR5PSIwLjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjZHJhZ29uU2NhbGVzKSIvPgo8L3N2Zz4=')] opacity-30"></div>
        
        {/* Üst katman gradient efekti */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1411] via-transparent to-[#1C1411] opacity-60"></div>
        
        {/* Yan gradientler - derinlik efekti için */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1411] via-transparent to-[#1C1411] opacity-40"></div>
        
        {/* Vinyetleme efekti */}
        <div className="absolute inset-0 bg-radial-gradient opacity-50"></div>
        
        {/* İnteraktif parıltı efekti */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)] animate-pulse opacity-20"></div>

        <div className="absolute top-4 right-4 flex space-x-4">
          <button
            onClick={toggleLanguage}
            className="p-3 rounded-full hover:bg-amber-900/20 transition-colors"
          >
            <Globe size={24} className="text-amber-600" />
          </button>
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="p-3 rounded-full hover:bg-amber-900/20 transition-colors"
          >
            {audioEnabled ? 
              <Volume2 size={24} className="text-amber-600" /> : 
              <VolumeX size={24} className="text-amber-600" />
            }
          </button>
        </div>

        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-xl space-y-12">
            <div className="text-center space-y-6 relative">
              {/* Dekoratif üst çizgi */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-amber-600/50 to-transparent"></div>
              
              <Crown className="mx-auto text-amber-600 w-16 h-16 mb-4" />
              
              <div>
                <h1 className="text-5xl font-serif font-bold text-amber-200 mb-2">
                  {translations[language].title}
                </h1>
                <p className="text-lg text-amber-400/80 font-serif">
                  {translations[language].subtitle}
                </p>
              </div>

              <div className="flex justify-center gap-8">
                <Shield className="text-amber-600 animate-pulse" size={28} />
                <Sword className="text-amber-500 rotate-45" size={32} />
                <Shield className="text-amber-600 animate-pulse" size={28} />
              </div>

              {/* Dekoratif alt çizgi */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-amber-600/50 to-transparent"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-900/50 via-amber-600/50 to-amber-900/50 rounded-lg blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 opacity-75 group-hover:blur-md"></div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={translations[language].placeholder}
                  className="relative w-full px-6 py-4 bg-[#2C1810]/80 rounded-lg border border-amber-600/30 text-amber-200 placeholder-amber-600/50 focus:outline-none focus:border-amber-500 font-serif text-lg backdrop-blur-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full relative group overflow-hidden px-8 py-4 rounded-lg bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-amber-200 font-serif text-lg border border-amber-600/30 hover:border-amber-500 transition-all duration-300"
              >
                <div className="absolute inset-0 w-1/4 bg-amber-400/10 skew-x-[45deg] group-hover:-translate-x-full transition-transform duration-700"></div>
                <span className="relative flex items-center justify-center gap-3">
                  {translations[language].startButton}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#1a0f0f] text-amber-100">
      {/* Arka plan deseni */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0zMCAzMG0tMjggMGEyOCwyOCAwIDEsMSA1NiwwYTI4LDI4IDAgMSwxIC01NiwwIiBzdHJva2U9IiNEQkE4NUMiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-20"></div>

      <div className="absolute top-4 right-4">
        <button
          onClick={toggleLanguage}
          className="p-3 rounded-full hover:bg-amber-900/20 transition-colors"
        >
          <Globe size={24} className="text-amber-600" />
        </button>
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl space-y-10">
          <div className="text-center space-y-8">
            <h2 className="text-6xl font-serif font-bold text-amber-200">
              {isTyping ? (
                <span className="inline-flex gap-3">
                  <span className="animate-bounce">•</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>•</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>•</span>
                </span>
              ) : (
                `${translations[language].welcome}, ${name}`
              )}
            </h2>
            
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-900/50 via-amber-600/50 to-amber-900/50 rounded-lg blur opacity-75"></div>
              <div className="relative bg-[#2C1810]/90 rounded-lg p-8 border border-[#FFD700]/30 backdrop-blur-sm shadow-lg">
                <p className="text-2xl font-serif italic text-[#FFD700]">{currentQuote}</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {formatTime()}
            
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-900/50 via-amber-600/50 to-amber-900/50 rounded-lg blur opacity-75"></div>
              <div className="relative bg-[#2C1810]/80 rounded-lg p-6 border border-amber-600/30 backdrop-blur-sm text-center">
                <p className="text-2xl font-serif text-amber-200">{weatherMood}</p>
              </div>
            </div>

            <button
              onClick={() => setShowWelcome(false)}
              className="w-full py-4 rounded-lg bg-[#2C1810]/80 hover:bg-[#2C1810] border border-amber-600/30 hover:border-amber-500 transition-all duration-300 text-amber-200 font-serif text-lg backdrop-blur-sm"
            >
              {translations[language].backButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeExperience;