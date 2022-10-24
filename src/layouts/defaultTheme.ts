import { DefaultTheme } from "styled-components";

const base = {
  transitions: {
    fast: 'duration: .1s ease',
    calm: '.3s cubic-bezier(.05, .03, .35, 1)'
  },
  
  sizes: {
    mini: '11 / 14',
    tiny: '12 / 14',
    small: '13 / 14',
    medium: '14 / 14',
    large: '16 / 14',
    big: '18 / 14',
    huge: '20 / 14',
    massive: '24 / 14'
  },

  fonts: {
    body: {
      family: 'Roboto, Helvetiva Neue, Helvetica, Aria, sans-serif',
      weight: 400,
      size: '1rem',
      height: '1.5'
    },
    emphasis: {
      weight: 700,
      size: '1rem'
    },
    heading: {
      family: 'Roboto, Helvetiva Neue, Helvetica, Aria, sans-serif',
      weight: 500,
      size: '1.2rem',
      height: '1.25'
    },
    monospace: {
      family: 'Fira Code, Menlo, monospace',
      weight: 400,
      size: '1rem'
    }
  },

  text: {
    title: '#cc2b5e',
    normal: '#060606',
    normalInverse: '#f3f3f3',
    label: '#8d8b8b',
    muted: '#ababab',
    highlight: '#ad1e7a',
    interactive: '#753a88',
    interactiveActive: '#cc2b5e',
    highlightInverse: '#fff',
    interactiveInverse: '#ffffffD0',
    interactiveActiveInverse: '#fff'
  },

  border: {
    focusVisible: '2px solid #feac13',
    radius: {
      none: '0',
      minimal: '.1rem',
      small: '.3rem',
      medium: '.5rem',
      large: '.8rem'
    }
  },

  elevations: {
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1);',
    elevation1: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    elevation2: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    elevation3: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    elevation4: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    elevation5: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'
  },
  
  surface: {
    background: '#f3f3f3',
    foreground: '#fff',
    divider: '#d3d3d3',
    header: '#00000009',
    input: '#ededed',
    hover: '#00000019',
    active: '#cc2b5e19'
  }
};

export const defaultTheme: DefaultTheme = {
  ...base,

  alert: {
    success: {
      text: base.text.highlightInverse,
      surface: 'linear-gradient(145deg,#18cb7d,#19aa88)',
      border: 'none'
    },
    negative: {
      text: base.text.highlightInverse,
      surface: 'linear-gradient(145deg, #f00b51, #b0067d)',
      border: 'none'
    },
    info: {
      text: base.text.highlightInverse,
      surface: 'linear-gradient(145deg, #30a5db, #5d76dc)',
      border: 'none'
    },
    warning: {
      text: base.text.highlightInverse,
      surface: 'linear-gradient(145deg, #ffab1b, #e77613)',
      border: 'none'
    },
  },

  button: {
    default: {
      background: 'linear-gradient(115deg,#753a88,#cc2b5e)',
      color: base.text.interactiveInverse,
      border: '1px solid #cc2b5e',
    },
    active: {
      background: 'linear-gradient(115deg,#feac1318,#feac1336), linear-gradient(115deg,#753a88,#cc2b5e)',
      color: base.text.interactiveInverse,
      border: '1px solid #cc2b5e',
    },
    hover: {
      background: 'linear-gradient(115deg,#feac1318,#feac1336), linear-gradient(115deg,#753a88,#cc2b5e)',
      color: base.text.highlightInverse,
      border: '1px solid #cc2b5e',
    },
    disabled: {
      background: 'transparent',
      color: base.text.muted,
      border: `1px solid #${base.surface.divider}`,
    },
  },

  iconButton: {
    default: {
      background: 'transparent',
      color: '#753a88',
      border: 'none',
    },
    active: {
      background: base.surface.active,
      color: '#753a88',
      border: 'none',
    },
    hover: {
      background: base.surface.hover,
      color: '#cc2b5e',
      border: 'none',
    },
    disabled: {
      background: 'transparent',
      color: base.text.muted,
      border: `none`,
    },
  },

  navBar: {
    surface: 'linear-gradient(115deg,#753a88,#cc2b5e)',
    button: {
      default: {
        color: 'rgba(255,255,255,0.7)',
        background: 'transparent',
        border: 'none'
      },
      active: {
        color: '#FF512F',
        background: 'transparent',
        border: 'none'
      },
      current: {
        color: '#feac13',
        background: 'transparent',
        border: 'none'
      },
      hover: {
        color: undefined,
        background: 'transparent',
        border: 'none'
      },
      focus: {
        color: undefined,
        background: 'transparent',
        border: 'none'
      }
    }
  }
};
