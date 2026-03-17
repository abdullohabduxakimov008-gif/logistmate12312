import React, { useState } from 'react';
import { ChevronDown, Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  language: 'en' | 'ru' | 'uz';
  onLanguageChange: (lang: 'en' | 'ru' | 'uz') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, language, onLanguageChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems = [
    { id: 'home', label: { en: 'Home', ru: 'Главная', uz: 'Asosiy' } },
    { id: 'tests', label: { en: 'Tests', ru: 'Тесты', uz: 'Testlar' } },
    {
      id: 'dictionary',
      label: { en: 'Dictionary', ru: 'Словарь', uz: 'Lug\'at' },
      hasDropdown: true,
      items: [
        { id: 'terms', label: { en: 'Terms', ru: 'Термины', uz: 'Atamalar' } },
        { id: 'glossary', label: { en: 'Glossary', ru: 'Глоссарий', uz: 'Glossariy' } },
        { id: 'abbreviations', label: { en: 'Abbreviations', ru: 'Аббревиатуры', uz: 'Abbreviaturalar' } },
      ],
    },
    { id: 'safety', label: { en: 'Safety', ru: 'Безопасность', uz: 'Xavfsizlik' }, hasDropdown: true },
    { id: 'tools', label: { en: 'Tools', ru: 'Инструменты', uz: 'Asboblar' }, hasDropdown: true },
    { id: 'other', label: { en: 'Other', ru: 'Другое', uz: 'Boshqa' }, hasDropdown: true },
  ];

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'РУ' },
    { code: 'uz', label: 'УЗ' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <nav className="sticky top-2.5 z-50 bg-white border-b border-gray-200 rounded-2xl mx-4 sm:mx-6 lg:mx-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <img src="/logistmate-logo.png" alt="Logistmate" className="h-8 w-auto" />
            <span className="text-xl font-bold text-gray-900 hidden sm:inline">Logistmate</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    currentPage === item.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.label[language]}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </button>

                {/* Dropdown Menu */}
                {item.hasDropdown && item.id === 'dictionary' && (
                  <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.items?.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => handleNavClick(subItem.id)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {subItem.label[language]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side - Logo, Language, Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="hidden sm:flex items-center gap-2 border-l border-gray-200 pl-4">
              <Globe className="w-4 h-4 text-gray-600" />
              <div className="flex gap-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code as 'en' | 'ru' | 'uz')}
                    className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
                      language === lang.code
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* BIG-I Logo */}
            <img src="/bigi-study-logo.png" alt="BIG-I" className="h-8 w-auto hidden sm:block" />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200"
            >
              <div className="px-4 py-3 space-y-2">
                {navItems.map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() =>
                        item.hasDropdown ? toggleDropdown(item.id) : handleNavClick(item.id)
                      }
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                        currentPage === item.id
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {item.label[language]}
                      {item.hasDropdown && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            openDropdown === item.id ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </button>

                    {/* Mobile Dropdown */}
                    {item.hasDropdown && openDropdown === item.id && item.id === 'dictionary' && (
                      <div className="pl-4 space-y-2 mt-2">
                        {item.items?.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => handleNavClick(subItem.id)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                          >
                            {subItem.label[language]}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Mobile Language Selector */}
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <div className="text-xs font-medium text-gray-600 mb-2">
                    {language === 'en' ? 'Language' : language === 'ru' ? 'Язык' : 'Til'}
                  </div>
                  <div className="flex gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => onLanguageChange(lang.code as 'en' | 'ru' | 'uz')}
                        className={`flex-1 text-xs font-medium px-3 py-2 rounded transition-colors ${
                          language === lang.code
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
