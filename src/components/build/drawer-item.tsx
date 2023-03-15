import {ListItem, ListItemText} from '@mui/material';


export const citems = ({
  text,
  twotext,
  onClick,
}: listing) => {
  return (
    <ListItem button key={text} onClick={onClick} id={text}>
      <ListItemText primary={text} secondary={twotext} />
    </ListItem>
  );
};


type listing= {
  text: string;
  twotext?: string;
  onClick?: () => void;
  isButton?: boolean;
};

