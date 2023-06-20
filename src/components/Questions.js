import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo } from "react";
import theme from "../common/Theme";

const Questions = (props) => {
  const { item } = props || {};
  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(item?.link)}
      activeOpacity={0.7}
      style={{
        backgroundColor: theme.white,
        width: "100%",
        borderRadius: 5,
        ...theme.light_shadow,
      }}
    >
      <View style={styles.card}>
        <Image
          source={{ uri: item?.owner?.profile_image }}
          style={styles.profileImage}
        />
        <View style={styles.content}>
          <Text numberOfLines={3} style={styles.title}>
            {item?.title}
          </Text>
          <Text style={styles.details}>
            Posted by {item?.owner?.display_name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              // justifyContent: "space-between",
            }}
          >
            <Text style={styles.details}>Score: {item?.score}</Text>
            <Text style={styles.details}>Views: {item?.view_count}</Text>
            <Text style={styles.details}>Answered: {item?.answer_count}</Text>
          </View>
          <Text style={styles.link} onPress={() => Linking.openURL(item?.link)}>
            Read More
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Questions);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    alignSelf: "flex-start",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    marginBottom: 2,
    marginRight: 15,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
