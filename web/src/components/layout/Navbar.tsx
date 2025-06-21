import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { RootState } from '../../store';
import {
  Box,
  Flex,
  Button,
  Link,
  Heading,
  Spacer,
  useColorMode,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FaUtensils, FaDatabase, FaCog } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    dispatch(logout());
  };

  const navItems = [
    { name: 'Meal Plans', path: '/meal-plans', icon: FaUtensils },
    { name: 'Preferences', path: '/preferences', icon: FaCog },
  ];

  const NavLinks = () => (
    <VStack spacing={4} align="stretch">
      {navItems.map((item) => (
        <Link
          key={item.path}
          as={RouterLink}
          to={item.path}
          onClick={onClose}
          display="flex"
          alignItems="center"
          p={2}
          borderRadius="md"
          _hover={{ bg: 'gray.100' }}
        >
          <Icon as={item.icon} mr={2} />
          {item.name}
        </Link>
      ))}
      {isAuthenticated && (
        <Link
          as={RouterLink}
          to="/admin/database"
          onClick={onClose}
          display="flex"
          alignItems="center"
          p={2}
          borderRadius="md"
          _hover={{ bg: 'gray.100' }}
        >
          <Icon as={FaDatabase} mr={2} />
          Database Dashboard
        </Link>
      )}
    </VStack>
  );

  return (
    <Box as="nav" bg="white" boxShadow="sm" position="sticky" top={0} zIndex={10}>
      <Flex
        maxW="container.xl"
        mx="auto"
        px={4}
        py={4}
        align="center"
      >
        <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
          <Heading size="md">Annapurna</Heading>
        </Link>

        <Spacer />

        {/* Desktop Navigation */}
        <Flex display={{ base: 'none', md: 'flex' }} align="center" gap={4}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              as={RouterLink}
              to={item.path}
              display="flex"
              alignItems="center"
              _hover={{ textDecoration: 'none' }}
            >
              <Icon as={item.icon} mr={2} />
              {item.name}
            </Link>
          ))}
        </Flex>

        <Spacer />

        <Flex align="center" gap={4}>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
          />

          {isAuthenticated ? (
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                size="sm"
              >
                Account
              </MenuButton>
              <MenuList>
                <MenuItem
                  as={RouterLink}
                  to="/admin/database"
                  icon={<FaDatabase />}
                >
                  Database Dashboard
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button
              as={RouterLink}
              to="/login"
              colorScheme="blue"
              size="sm"
            >
              Login
            </Button>
          )}

          {/* Mobile menu button */}
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            variant="ghost"
          />
        </Flex>
      </Flex>

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <NavLinks />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar; 