import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

const Home: React.FC = () => {
  return (
    <Container maxW={'7xl'}>
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
          >
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: useColorModeValue('brand.100', 'brand.900'),
                zIndex: -1,
              }}
            >
              Annapurna
            </Text>
            <br />
            <Text as={'span'} color={'brand.500'}>
              Your Daily Meal Planning Assistant
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Simplify your daily meal planning with personalized suggestions for breakfast,
            lunch, dinner, and snacks. Discover the joy of cooking without the daily
            dilemma of deciding what to make.
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}
          >
            <Button
              as={RouterLink}
              to="/register"
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              colorScheme={'brand'}
            >
              Get Started
            </Button>
            <Button
              as={RouterLink}
              to="/login"
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              variant={'outline'}
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Home; 