import { useEffect } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import styled, { css } from 'styled-components';
import { IconButton } from '../buttons/Button';
import { paperStyle } from '../crafts/Paper';
import { Text } from '../crafts/Text';

type AlertPaperProps = {
  level?: 'success' | 'error' | 'info' | 'warning';
}

function alertLevel(level?: 'success' | 'error' | 'info' | 'warning') {
  switch (level) {
    case 'error': return css(({ theme }) => `
      color: ${theme.alert.negative.text};
      background: ${theme.alert.negative.surface};
      border: ${theme.alert.negative.border};

      ${Text} {
        color: ${theme.alert.negative.text};
      }

      ${IconButton} {
        color: ${theme.alert.negative.text};
      }
    `);
    case 'warning': return css(({theme}) => `
      color: ${theme.alert.warning.text};
      background: ${theme.alert.warning.surface};
      border: ${theme.alert.warning.border};

      ${Text} {
        color: ${theme.alert.warning.text};
      }

      ${IconButton} {
        color: ${theme.alert.warning.text};
      }
    `);
    case 'success': return css(({theme}) => `
      color: ${theme.alert.success.text};
      background: ${theme.alert.success.surface};
      border: ${theme.alert.success.border};

      ${Text} {
        color: ${theme.alert.success.text};
      }

      ${IconButton} {
        color: ${theme.alert.success.text};
      }
    `);
    default: return;
  }
}

const AlertPaper = styled.section<AlertPaperProps>(({ theme, level }) => css`
  ${paperStyle}
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0;
  box-shadow: ${theme.elevations.elevation2};

  color: ${theme.alert.info.text};
  background: ${theme.alert.info.surface};
  border: ${theme.alert.info.border};

  ${IconButton} {
    color: ${theme.alert.info.text};
  }

  ${Text} {
    padding: 0.5rem 1.5rem;
    margin: 0;
    font-weight: 500;
    color: ${theme.alert.info.text};
    text-shadow: ${theme.elevations.elevation1};
  }

  ${IconButton} {
    margin: 0;
    color: ${theme.alert.info.text};
  }

  ${alertLevel(level)}
`);

export type AlertProps = {
  className?: string;
  message: string;
  timeout?: number;
  onClose?: () => void;
} & AlertPaperProps;

function Alert({ message, timeout, level = 'info', onClose }: AlertProps) {
  
  useEffect(() => {
    let st: NodeJS.Timeout | undefined = undefined;
    if (timeout !== undefined) {
      st = setTimeout(() => onClose?.call(null), timeout);
    }
    
    return () => {
      if (st !== undefined) clearTimeout(st);
    }
  }, [onClose, timeout]);

  return (
    <AlertPaper level={level}>
      <Text>{message}</Text>
      {!!onClose && <IconButton onClick={onClose}>
        <MdDeleteForever />
      </IconButton>}
    </AlertPaper>
  );
}

Alert.displayName = 'Alert'
export default Alert;