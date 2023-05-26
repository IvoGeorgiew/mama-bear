import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const price = item.price;
  const name = item.name;

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <div
          onClick={() => navigate(`/item/${item.id}`)}
          style={{
            width: "300px",
            height: "400px",
            margin: "0 auto",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          <img
            alt={item.name}
            src={item.imageUrl}
            style={{
              width: "auto",
              height: "100%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              transform: isHovered ? "scale(1.2)" : "scale(1)",
              transition: "transform 0.3s ease-in-out",
            }}
          />
        </div>
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
              }}
              sx={{ backgroundColor: shades.primary[300], color: "white" }}
            >
              Добави в количката
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">{price}лв.</Typography>
      </Box>
    </Box>
  );
};

export default Item;
