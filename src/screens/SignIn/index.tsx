import React, { useContext } from "react";
import { RFValue } from "react-native-responsive-fontsize";

import { AuthContext } from "../../AuthContext";

import {
  Container,
  Header,
  Title,
  TitleWrapper,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

import LogoSvg from "../../assets/logo.svg";
import GoogleSvg from "../../assets/google.svg";
import AppleSvg from "../../assets/apple.svg";

import { SignInSocialButton } from "../../components/SignInSocialButton";

export function SignIn() {
  const data = useContext(AuthContext);
  console.log(data);

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {"\n"} finanças de forma {"\n"} muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {"\n"} uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} />
          <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
