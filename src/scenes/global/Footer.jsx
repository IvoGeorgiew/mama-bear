import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";

function Footer() {
  const {
    palette: { neutral },
  } = useTheme();
  return (
    <Box marginTop="70px" padding="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            MAMA BEAR
          </Typography>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </div>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            За нас
          </Typography>
          <Typography mb="30px">Условия</Typography>
          <Typography mb="30px">Условия за личните данни</Typography>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Грижа за клиента
          </Typography>
          <Typography mb="30px">Помощен център</Typography>
          <Typography mb="30px">Проследяване на доставка</Typography>
          <Typography mb="30px">Връщане на стока</Typography>
        </Box>

        <Box width="clamp(20%, 25%, 30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Контакти
          </Typography>
          <Typography mb="30px">София, Връх Манчо 54</Typography>
          <Typography mb="30px" sx={{ wordWrap: "break-word" }}>
            Имейл: mredwardroh@gmail.com
          </Typography>
          <Typography mb="30px">(+359)234-567-890</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
