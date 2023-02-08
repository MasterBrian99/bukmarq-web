import { Box, createStyles, UnstyledButton } from '@mantine/core';

const MainScreen = () => {
  const { classes } = useStyles();
  return (
    <div>
      <Box>
        <UnstyledButton className={classes.button}>asd</UnstyledButton>
      </Box>
    </div>
  );
};

export default MainScreen;

const useStyles = createStyles((theme, _params, getRef) => ({
  button: {
    margin: '10px',
    borderWidth: '1px',
    borderColor: 'blue',
    width: '100%',
    borderStyle: 'solid',
  },
}));
