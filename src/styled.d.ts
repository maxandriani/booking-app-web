import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    transitions: {
      fast: any;
      calm: any;
    },
    
    sizes: {
      mini: any;
      tiny: any;
      small: any;
      medium: any;
      large: any;
      big: any;
      huge: any;
      massive: any;
    },
  
    fonts: {
      body: {
        family: any;
        weight: any;
        size: any;
        height: any;
      },
      emphasis: {
        weight: any;
        size: any;
      },
      heading: {
        family: any;
        weight: any;
        size: any;
        height: any;
      },
      monospace: {
        family: any;
        weight: any;
        size: any;
      }
    },
  
    text: {
      title: any;
      normal: any;
      normalInverse: any;
      muted: any;
      label: any;
      highlight: any;
      interactive: any;
      interactiveActive: any;
      highlightInverse: any;
      interactiveInverse: any;
      interactiveActiveInverse: any;
    },
  
    border: {
      focusVisible: any,
      radius: {
        none: any;
        minimal: any;
        small: any;
        medium: any;
        large: any;
      }
    },
  
    elevations: {
      transition: any;
      elevation1: any;
      elevation2: any;
      elevation3: any;
      elevation4: any;
      elevation5: any;
    },
    
    surface: {
      background: any;
      foreground: any;
      divider: any;
      header: any;
      input: any;
      hover: any;
      active: any;
    },
  
    alert: {
      success: {
        surface: any;
        text: any;
        border: any;
      },
      negative: {
        surface: any;
        text: any;
        border: any;
      },
      info: {
        surface: any;
        text: any;
        border: any;
      },
      warning: {
        surface: any;
        text: any;
        border: any;
      }
    },
  
    button: {
      default: {
        color: any;
        background: any;
        border: any;
      },
      active: {
        color: any;
        background: any;
        border: any;
      },
      hover: {
        color: any;
        background: any;
        border: any;
      },
      disabled: {
        color: any;
        background: any;
        border: any;
      },
    },
    iconButton: {
      default: {
        color: any;
        background: any;
        border: any;
      },
      active: {
        color: any;
        background: any;
        border: any;
      },
      hover: {
        color: any;
        background: any;
        border: any;
      },
      disabled: {
        color: any;
        background: any;
        border: any;
      },
    },

    navBar: {
      surface: any;
      button: {
        default: {
          color: any;
          background: any;
          border: any;
        },
        active: {
          color: any;
          background: any;
          border: any;
        },
        current: {
          color: any;
          background: any;
          border: any;
        },
        hover: {
          color: any;
          background: any;
          border: any;
        },
        focus: {
          color: any;
          background: any;
          border: any;
        },
      }
    }
  }
}