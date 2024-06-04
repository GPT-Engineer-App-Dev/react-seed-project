import { Box, Container, Flex, Text, VStack, Link, Button, Input, FormControl, FormLabel, FormErrorMessage, Alert, AlertIcon } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth, SupabaseAuthUI } from "../integrations/supabase/auth.jsx";

const Login = () => {
  const { session, logout } = useSupabaseAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box>
      {/* Navigation Bar */}
      <Box as="nav" bg="brand.700" color="white" py={4}>
        <Container maxW="container.lg">
          <Flex justify="space-between" align="center">
            <Text fontSize="xl" fontWeight="bold">My Website</Text>
            <Flex>
              <Link href="/" px={4}>Home</Link>
              <Link href="/about" px={4}>About</Link>
              <Link href="/contact" px={4}>Contact</Link>
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container maxW="container.lg" py={8}>
        <VStack spacing={4}>
          <Text fontSize="2xl">Login</Text>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          <form onSubmit={handleLogin}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button type="submit" colorScheme="blue" mt={4}>Login</Button>
          </form>
          <SupabaseAuthUI />
        </VStack>
      </Container>

      {/* Footer */}
      <Box as="footer" bg="brand.900" color="white" py={4} mt={8}>
        <Container maxW="container.lg">
          <Text textAlign="center">&copy; 2023 My Website. All rights reserved.</Text>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;