import { useTheme } from 'components/ThemeProvider';
import { forwardRef } from 'react';
import styles from './Monogram.module.css';

export const Monogram = forwardRef(function Monogram(
  { className = '', style, size = 56, 'data-align': dataAlign, ...rest },
  ref
) {
  const { themeId } = useTheme();
  const fillColor = themeId === 'dark' ? '#FFFFFF' : '#000000';
  const dimension = typeof size === 'number' ? `${size}px` : size;
  return (
    <div
      ref={ref}
      className={`${styles.monogramWrapper} ${className}`}
      style={{ width: dimension, height: dimension, ...style }}
      data-align={dataAlign}
      {...rest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 375 374.999991"
        role="img"
        aria-label="Logo"
        className={styles.monogram}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <clipPath id="c73b717a5b">
            <path
              d="M 127.703125 126.6875 L 262.492188 126.6875 L 262.492188 248.15625 L 127.703125 248.15625 Z M 127.703125 126.6875 "
              clipRule="nonzero"
            />
          </clipPath>
          <clipPath id="1fe6038254">
            <path
              d="M 112.5 159.808594 L 218.480469 159.808594 L 218.480469 248.15625 L 112.5 248.15625 Z M 112.5 159.808594 "
              clipRule="nonzero"
            />
          </clipPath>
        </defs>
        <g clipPath="url(#c73b717a5b)">
          <path
            fill={fillColor}
            d="M 228.910156 209.578125 L 228.898438 209.582031 C 242.464844 202.027344 251.640625 187.546875 251.640625 170.917969 C 251.640625 146.488281 231.839844 126.6875 207.410156 126.6875 L 127.78125 126.6875 L 138.371094 138.902344 C 143.824219 145.191406 151.734375 148.800781 160.054688 148.800781 L 207.410156 148.800781 C 219.625 148.800781 229.527344 158.703125 229.527344 170.917969 C 229.527344 183.132812 219.625 193.03125 207.410156 193.03125 L 185.296875 193.03125 L 204.46875 215.148438 L 224.644531 238.417969 C 230.09375 244.707031 238.007812 248.320312 246.328125 248.320312 L 262.492188 248.320312 L 228.910156 209.578125 "
            fillOpacity="1"
            fillRule="nonzero"
          />
        </g>
        <g clipPath="url(#1fe6038254)">
          <path
            fill={fillColor}
            d="M 204.980469 181.972656 L 194.390625 169.757812 C 188.9375 163.472656 181.027344 159.859375 172.707031 159.859375 L 112.5 159.859375 L 180.605469 238.417969 C 186.054688 244.707031 193.964844 248.320312 202.289062 248.320312 L 218.453125 248.320312 L 160.941406 181.972656 L 204.980469 181.972656 "
            fillOpacity="1"
            fillRule="nonzero"
          />
        </g>
      </svg>
    </div>
  );
});
