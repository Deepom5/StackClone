import React, { memo, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import QuestionsManager from "../services/features/Questions/QuestionsManager";
import Questions from "../components/Questions";
import theme from "../common/Theme";
import { useScrollToTop } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../redux/Store";
import {
  setLoadingNode,
  setNodeQuestions,
  setPageNode,
  setHasMoreNode,
} from "../redux/reducers/nodeSlice";
import AppContainer from "../components/Container/AppContainer";

const NodeScreen = () => {
  const { loadingNode, nodeQuestions, hasMoreNode, nodePage } = useAppSelector(
    (state) => state.node
  );
  const storeDispatch = useAppDispatch();

  useEffect(() => {
    getNodeQuestions(nodePage);
  }, [nodePage]);

  const getNodeQuestions = (pageNumber) => {
    storeDispatch(setLoadingNode(true));
    var params = {
      page: pageNumber,
      tag: "nodejs",
    };
    QuestionsManager.getQuestions(
      params,
      async (res) => {
        console.log("RES==>", res);
        storeDispatch(
          setNodeQuestions([...nodeQuestions, ...res?.data?.items])
        );
        await storeDispatch(setHasMoreNode(res?.data?.has_more));
        storeDispatch(setLoadingNode(false));
      },
      (err) => {
        console.log("RES===>", err);
        storeDispatch(setLoadingNode(false));
      }
    );
  };

  const handleLoadMore = () => {
    console.log("is Loading", hasMoreNode);
    if (hasMoreNode) storeDispatch(setPageNode(nodePage + 1));
  };

  const scrollNode = useRef(null);
  useScrollToTop(scrollNode);

  return (
    <AppContainer scrollable={false}>
      <FlatList
        ref={scrollNode}
        style={{ flex: 1, height: "100%", width: "100%" }}
        contentContainerStyle={{ paddingBottom: 50 }}
        onStartShouldSetResponder={() => console.log("View Scrolled")}
        scrollEventThrottle={400}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        data={nodeQuestions}
        ListHeaderComponent={() => (
          <Text
            style={{
              fontSize: 24,
              fontWeight: "600",
              textAlign: "center",
              padding: 10,
              backgroundColor: theme.white,
            }}
          >
            Node-Questions
          </Text>
        )}
        renderItem={({ item, index }) => (
          <View key={index} style={{ marginHorizontal: 7, marginVertical: 3 }}>
            <Questions item={item} />
          </View>
        )}
        ListFooterComponent={() => {
          return (
            !hasMoreNode &&
            !loadingNode && (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: theme.primary,
                  padding: 20,
                  textAlign: "center",
                }}
              >
                End Of Page 🎉
              </Text>
            )
          );
        }}
      />
      {loadingNode && (
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
            color: theme.white,
            backgroundColor: theme.primary,
            textAlign: "center",
            padding: 5,
          }}
        >
          Loading ...
        </Text>
      )}
    </AppContainer>
  );
};

export default memo(NodeScreen);

const styles = StyleSheet.create({});
