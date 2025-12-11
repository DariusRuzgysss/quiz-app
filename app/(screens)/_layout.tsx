import { ContentWrapper } from "@components";
import { Slot } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <ContentWrapper>
      <Slot />
    </ContentWrapper>
  );
};

export default Layout;
