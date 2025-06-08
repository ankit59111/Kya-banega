import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Button,
  Stack,
  useColorModeValue,
  useDisclosure,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';

const Navbar: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <RouterLink to="/">
            <Box
              textAlign={useColorModeValue('left', 'center')}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}
              fontWeight="bold"
              fontSize="xl"
            >
              Annapurna
            </Box>
          </RouterLink>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          {token ? (
            <HStack spacing={4}>
              <Button
                as={RouterLink}
                to="/meal-plan"
                fontSize={'sm'}
                fontWeight={600}
                variant={'ghost'}
              >
                Meal Plan
              </Button>
              <Button
                onClick={handleLogout}
                fontSize={'sm'}
                fontWeight={600}
                colorScheme={'brand'}
              >
                Logout
              </Button>
            </HStack>
          ) : (
            <HStack spacing={4}>
              <Button
                as={RouterLink}
                to="/login"
                fontSize={'sm'}
                fontWeight={600}
                variant={'ghost'}
              >
                Login
              </Button>
              <Button
                as={RouterLink}
                to="/register"
                fontSize={'sm'}
                fontWeight={600}
                colorScheme={'brand'}
              >
                Register
              </Button>
            </HStack>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default Navbar; 