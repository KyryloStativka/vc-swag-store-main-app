import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const CloseIcon: React.FC<IconProps> = ({ className = '', ...props }) => {
  return (
    <svg 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect x="12.4194" y="2.5199" width="1.5" height="14" transform="rotate(45 12.4194 2.5199)" fill="currentColor"/>
        <rect x="13.48" y="12.4194" width="1.5" height="14" transform="rotate(135 13.48 12.4194)" fill="currentColor"/>
    </svg>
  );
};