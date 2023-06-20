import React, { memo, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import QuestionsManager from "../services/features/Questions/QuestionsManager";
import Questions from "../components/Questions";
import theme from "../common/Theme";
import { useScrollToTop } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../redux/Store";
import {
  setLoadingNative,
  setNativeQuestions,
  setPageNative,
  setHasMoreNative,
} from "../redux/reducers/reactNativeSlice";
import AppContainer from "../components/Container/AppContainer";

const ReactNativeScreen = () => {
  const { loadingNative, nativeQuestions, hasMoreNative, nativePage } =
    useAppSelector((state) => state.native);
  const storeDispatch = useAppDispatch();

  useEffect(() => {
    getReactNativeQuestions(nativePage);
  }, [nativePage]);

  const getReactNativeQuestions = (pageNumber) => {
    storeDispatch(setLoadingNative(true));
    var params = {
      page: pageNumber,
      tag: "react-native",
    };
    QuestionsManager.getQuestions(
      params,
      async (res) => {
        console.log("RES==>", res);
        storeDispatch(
          setNativeQuestions([...nativeQuestions, ...res?.data?.items])
        );
        await storeDispatch(setHasMoreNative(res?.data?.has_more));
        storeDispatch(setLoadingNative(false));
      },
      (err) => {
        console.log("RES===>", err);
        storeDispatch(setLoadingNative(false));
      }
    );
  };

  const handleLoadMore = () => {
    console.log("is Loading", hasMoreNative);
    if (hasMoreNative) storeDispatch(setPageNative(nativePage + 1));
  };

  const scrollNative = useRef(null);
  useScrollToTop(scrollNative);
  return (
    <AppContainer scrollable={false}>
      <FlatList
        ref={scrollNative}
        style={{ flex: 1, height: "100%", width: "100%" }}
        contentContainerStyle={{ paddingBottom: 50 }}
        onStartShouldSetResponder={() => console.log("View Scrolled")}
        scrollEventThrottle={400}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        data={nativeQuestions}
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
            React-Native Questions
          </Text>
        )}
        renderItem={({ item, index }) => (
          <View key={index} style={{ marginHorizontal: 7, marginVertical: 3 }}>
            <Questions item={item} />
          </View>
        )}
        ListFooterComponent={() => {
          return (
            !hasMoreNative &&
            !loadingNative && (
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
      {loadingNative && (
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

export default memo(ReactNativeScreen);

const styles = StyleSheet.create({});
