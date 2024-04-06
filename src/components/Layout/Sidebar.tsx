"use client";

import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { IconType } from "react-icons";
import Nav from "./Navbar";
import { Image } from "@chakra-ui/next-js";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { BiCoinStack } from "react-icons/bi";
import Link from "next/link";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  children: React.ReactNode;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, href: "/" },
  { name: "Assets", icon: BiCoinStack, href: "/assets" },
];

interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { isOpen, setIsOpen } = useContext(SidebarContext); // we will use context to manage the sidebar state

  return (
    <Box
      transition="width 0.3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: `${isOpen ? "60" : "20"}` }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      pos="fixed"
      h="full"
      overflow={"hidden"}
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        pl="5"
        justifyContent="space-between"
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Flex align="center" gap={4} borderRadius="lg">
          <Image
            width={45}
            height={45}
            alt="StellarTools"
            src={"/StellarTools-removebg.png"}
          />
          <Text
            fontSize={"xl"}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="clip"
            as={"b"}
          >
            Stellar Tools
          </Text>
        </Flex>
        <CloseButton
          display={{ base: "flex", md: "none" }}
          mr={8}
          onClick={onClose}
        />
      </Flex>
      <Box py={4}>
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            href={link.href}
            overflow={"hidden"}
          >
            {link.name}
          </NavItem>
        ))}
      </Box>
    </Box>
  );
};
export const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {
  return (
    <Link href={href}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: useColorModeValue("cyan.400", "gray.600"),
          color: "white",
        }}
        {...rest}
      >
        <Icon
          mr={4}
          fontSize="24"
          _groupHover={{
            color: "white",
          }}
          as={icon}
        />
        {children}
      </Flex>
    </Link>
  );
};

const SubHeader = () => {
  return (
    <Flex
      // ml={{ base: 0, md: 60 }}
      // px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
    >
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>
      FDDDDDDDD
    </Flex>
  );
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{ isOpen: isSidebarOpen, setIsOpen: setIsSidebarOpen }}
    >
      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
        <Nav onOpen={onOpen} />
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        <Box ml={{ base: 0, md: 60 }} p="4">
          {/* <SubHeader /> */}
          {children}
        </Box>
      </Box>
    </SidebarContext.Provider>
  );
};

export default MainLayout;