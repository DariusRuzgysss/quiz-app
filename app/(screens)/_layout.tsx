import { ErrorBoundary, Slot } from "expo-router";
import { Try } from "expo-router/build/views/Try";
import React from "react";
import { ContentWrapper } from "../../components";

const Layout = () => {
  return (
    <Try catch={ErrorBoundary}>
      <ContentWrapper>
        <Slot />
      </ContentWrapper>
    </Try>
  );
};

export default Layout;
