import { useEffect } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import styled, { css } from 'styled-components';
import { IconButton } from '../buttons/Button';
import { Paper } from '../crafts/Paper';
import { Text } from '../crafts/Text';
import { theme } from '../theme';

type AlertPaperProps = {
  level?: 'success' | 'error' | 'info' | 'warning';
}

const AlertPaper = styled(Paper)<AlertPaperProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0;
  box-shadow: ${theme.elevation2};
  //border-radius: ${theme.radiusLarge};

  color: white;
  background: linear-gradient(145deg, #30a5db, #5d76dc);

  ${Text} {
    padding: 0.5rem 1.5rem;
    margin: 0;
    font-weight: 500;
    color: white;
    text-shadow: ${theme.elevation1};
  }

  ${IconButton} {
    margin: 0;
  }

  ${({ level }) => {
    switch (level) {
      case 'error': return css`
        background: linear-gradient(145deg, #f00b51, #b0067d);

        ${IconButton} {
          color: white;
        }
      `
      case 'warning': return css`
        background: linear-gradient(145deg, #ffab1b, #e77613);

        ${IconButton} {
          color: white;
        }
      `;
      case 'success': return css`
        background: linear-gradient(145deg, #18cb7d, #19aa88);

        ${IconButton} {
          color: white;
        }
      `;
      default: return '';
    }
  }}
`;

export type AlertProps = {
  className?: string;
  message: string;
  timeout?: number;
  onClose?: () => void;
} & AlertPaperProps;

function Alert({ message, timeout, level = 'success', onClose }: AlertProps) {
  
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