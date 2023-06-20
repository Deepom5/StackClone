import React, { memo, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import QuestionsManager from "../services/features/Questions/QuestionsManager";
import Questions from "../components/Questions";
import theme from "../common/Theme";
import { useScrollToTop } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../redux/Store";
import {
  setLoadingReact,
  setReactQuestions,
  setPage,
  setHasMoreReact,
} from "../redux/reducers/reactSlice";
import AppContainer from "../components/Container/AppContainer";

const ReactScreen = () => {
  const { loadingQuestions, reactQuestions, hasMoreQuestions, page } =
    useAppSelector((state) => state.react);
  const storeDispatch = useAppDispatch();

  useEffect(() => {
    getReactQuestions(page);
  }, [page]);

  const getReactQuestions = (pageNumber) => {
    storeDispatch(setLoadingReact(true));
    var params = {
      page: pageNumber,
      pagesize: 10,
      order: "desc",
      sort: "hot",
      tag: "reactjs",
    };
    QuestionsManager.getQuestions(
      params,
      async (res) => {
        storeDispatch(
          setReactQuestions([...reactQuestions, ...res?.data?.items])
        );
        await storeDispatch(setHasMoreReact(res?.data?.has_more));
        storeDispatch(setLoadingReact(false));
      },
      (err) => {
        console.log("RES===>", err);
        storeDispatch(setLoadingReact(false));
      }
    );
  };

  const handleLoadMore = () => {
    console.log("is Loading", hasMoreQuestions);
    if (hasMoreQuestions) storeDispatch(setPage(page + 1));
  };

  const scrollHome = useRef(null);
  useScrollToTop(scrollHome);

  return (
    <AppContainer scrollable={false}>
      <FlatList
        ref={scrollHome}
        style={{ flex: 1, height: "100%", width: "100%" }}
        contentContainerStyle={{ paddingBottom: 50 }}
        onStartShouldSetResponder={() => console.log("View Scrolled")}
        scrollEventThrottle={400}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        data={reactQuestions}
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
            React Questions
          </Text>
        )}
        renderItem={({ item, index }) => (
          <View key={index} style={{ marginHorizontal: 7, marginVertical: 3 }}>
            <Questions item={item} />
          </View>
        )}
        ListFooterComponent={() => {
          return (
            !hasMoreQuestions &&
            !loadingQuestions && (
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
      {loadingQuestions && (
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

export default memo(ReactScreen);

const styles = StyleSheet.create({});
