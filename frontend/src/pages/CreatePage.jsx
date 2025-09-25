import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: null, // change to file instead of string
  });
  const toast = useToast();

  const { createProduct } = useProductStore();

  const handleFileChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  const handleAddProduct = async () => {
    try {
      // Use FormData to send file + text
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("image", newProduct.image);

      const { success, message } = await createProduct(formData, true);
      // (true = telling store we’re sending FormData, adjust accordingly)

      toast({
        title: success ? "Success" : "Error",
        description: message,
        status: success ? "success" : "error",
        isClosable: true,
      });

      setNewProduct({ name: "", price: "", image: null });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            {/* File input for image */}
            <Input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />

            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};
export default CreatePage;
