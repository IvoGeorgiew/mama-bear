import { Box, Alert, AlertTitle } from "@mui/material";
const Confirmation = () => {
  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        <AlertTitle>Успех</AlertTitle>
        Вие успешно направихте поръчка -{" "}
        <strong>Честито приключване на покупката</strong>
      </Alert>
    </Box>
  );
};
export default Confirmation;
