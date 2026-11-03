import React from 'react';

/**
 * Official Sninat Logo asset uploaded by the user:
 * Modern dental technology emblem featuring the white tooth with electric-blue circuit connectivity lines
 * inside a soft sky-blue squircle and the bold "Sninat" wordmark.
 */
export const SNINAT_LOGO_IMAGE = '/assets/aistudio/IMG_6592_dc166d2d.jpeg';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'badge' | 'image-only';
  showSubtitle?: boolean;
  subtitleText?: string;
  theme?: 'light' | 'dark';
  showArabicName?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * The official Sninat squircle badge from the uploaded brand asset.
 */
export const OfficialSninatBadge: React.FC<{
  sizeClassName?: string;
  className?: string;
}> = ({ sizeClassName = 'w-10 h-10', className = '' }) => {
  return (
    <div
      className={`relative shrink-0 rounded-2xl overflow-hidden shadow-xs border border-[#A7D8F0]/50 transition-transform duration-200 hover:scale-105 select-none bg-[#BCE5F8] ${sizeClassName} ${className}`}
      aria-label="Sninat Logo"
    >
      <img
        src={SNINAT_LOGO_IMAGE}
        alt="Sninat Logo"
        className="w-full h-full object-cover"
        loading="eager"
      />
    </div>
  );
};

/**
 * Backward compatibility alias
 */
export const RealisticToothIcon: React.FC<{ sizeClassName?: string }> = ({ sizeClassName = 'w-10 h-10' }) => {
  return <OfficialSninatBadge sizeClassName={sizeClassName} />;
};

export const OfficialSninatTooth = OfficialSninatBadge;

/**
 * Sninat Official Brand Logo Component
 * Incorporates the official logo asset with the brand wordmark, optional localized tagline, and dark/light mode.
 */
export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'badge',
  showSubtitle = true,
  subtitleText = 'Soins dentaires près de vous',
  theme = 'light',
  showArabicName = false,
  onClick,
  className = '',
  style,
}) => {
  const iconSizeMap = {
    xs: 'w-7 h-7 rounded-lg',
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-10 h-10 rounded-2xl',
    lg: 'w-14 h-14 rounded-2xl',
    xl: 'w-20 h-20 sm:w-24 sm:h-24 rounded-3xl shadow-md',
    '2xl': 'w-28 h-28 sm:w-32 sm:h-32 rounded-3xl shadow-lg',
  };

  const titleSizeMap = {
    xs: 'text-base',
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl sm:text-4xl',
    '2xl': 'text-4xl sm:text-5xl',
  };

  const subSizeMap = {
    xs: 'text-[9px]',
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
    xl: 'text-sm sm:text-base font-semibold',
    '2xl': 'text-base sm:text-lg font-semibold',
  };

  const isDark = theme === 'dark';

  if (variant === 'image-only') {
    return (
      <div
        onClick={onClick}
        className={`relative shrink-0 overflow-hidden shadow-xs border border-[#A7D8F0]/50 ${iconSizeMap[size]} ${onClick ? 'cursor-pointer hover:opacity-95' : ''} ${className}`}
        style={style}
      >
        <img
          src={SNINAT_LOGO_IMAGE}
          alt="Sninat Logo"
          className="w-full h-full object-cover select-none"
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3.5 sm:gap-4 select-none text-left ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={style}
    >
      {/* Official Uploaded Logo Emblem */}
      <div
        className={`relative shrink-0 overflow-hidden shadow-xs border-2 border-white/80 transition-transform duration-200 group-hover:scale-105 bg-[#BCE5F8] ${iconSizeMap[size]}`}
      >
        <img
          src={SNINAT_LOGO_IMAGE}
          alt="Sninat Logo"
          className="w-full h-full object-cover select-none"
          loading="eager"
        />
      </div>

      {/* Brand Wordmark & Tagline */}
      <div className="flex flex-col justify-center leading-tight">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-extrabold tracking-tight transition-colors ${titleSizeMap[size]} ${
              isDark ? 'text-white' : 'text-[#172B68] group-hover:text-[#0066CC]'
            }`}
            style={{ letterSpacing: '-0.028em' }}
          >
            Sninat
          </span>

          {showArabicName && (
            <span
              className={`font-bold font-sans text-xs px-1.5 py-0.5 rounded-md ${
                isDark ? 'bg-white/10 text-[#93D5FF]' : 'bg-[#EAF5FC] text-[#0066CC]'
              }`}
            >
              سنينات
            </span>
          )}
        </div>

        {showSubtitle && subtitleText && (
          <span
            className={`font-medium transition-colors mt-0.5 tracking-tight ${subSizeMap[size]} ${
              isDark ? 'text-[#B0C4DE]' : 'text-[#5C706B]'
            }`}
          >
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  );
};
