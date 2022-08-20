import { View, Text, ScrollView } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { Colors } from '../../../constant/Colors';
import Custom_header from '../../../helper/Custom_header';
import { few_constants } from '../../../constant/small_constant/Few_Constants';
import { Normalize } from '../../../constant/for_responsive/Dimens';
import { globalStyles } from '../../../constant/StylePage';
import { getDate, getTime } from '../../../helper/TimeRelatedFunc';
import LoaderPage from '../../../helper/components/LoaderPage';
import EmptyScreen from '../../../components/EmptyScreen/EmptyScreen';
import { baseUrlWithEndPoint } from '../../../services/BaseUrl/baseUrl';
import { getAxios } from '../../../services/getData';
export default function Notice() {
  const [allNotice, setAllNotice] = useState([]);
  const [loader, setLoader] = useState(false);

  const getNoticeResult = async () => {
    setLoader(true);
    const res = await getAxios(baseUrlWithEndPoint.notice.notice);
    if (res.success) {
      setAllNotice(res.data.data);
    } else {
    }

    setLoader(false);
  };

  useEffect(() => {
    getNoticeResult();
  }, []);

  return (
    <View style={globalStyles.mainContainer_withoutpadding}>
      <Custom_header title={'Notice'} />
      {loader ? (
        <LoaderPage />
      ) : (
        <Fragment>
          {allNotice.length <= 0 ? (
            <Fragment>
              <EmptyScreen />
            </Fragment>
          ) : (
            <Fragment>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    paddingHorizontal: few_constants.paddingHorizantal,
                    paddingVertical: Normalize(8),
                  }}
                >
                  {allNotice.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        padding: Normalize(8),
                        width: '99%',
                        alignSelf: 'center',
                        backgroundColor: Colors.lightpurple,
                        marginBottom: Normalize(8),
                        borderRadius: Normalize(8),
                        elevation: Normalize(3),
                      }}
                    >
                      <Text
                        numberOfLines={2}
                        style={[
                          globalStyles.planeText_outfit_bold,
                          {
                            fontSize: Normalize(12),
                            color: Colors.purple,
                            letterSpacing: 0.5,
                          },
                        ]}
                      >
                        {item.headline}
                      </Text>
                      <Text
                        style={[
                          globalStyles.planeText_outfit_regular,
                          {
                            color: Colors.blueText2,
                            fontSize: Normalize(11.5),
                            paddingVertical: Normalize(5),
                          },
                        ]}
                      >
                        {item.content}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text
                          style={[
                            globalStyles.planeText_outfit_regular,
                            { fontSize: Normalize(11.5), color: Colors.blue },
                          ]}
                        >
                          {getDate(item.createdAt)}
                        </Text>
                        <Text
                          style={[
                            globalStyles.planeText_outfit_regular,
                            { fontSize: Normalize(11.5), color: Colors.blue },
                          ]}
                        >
                          {getTime(item.createdAt)}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </Fragment>
          )}
        </Fragment>
      )}
    </View>
  );
}
