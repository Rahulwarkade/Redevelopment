import React from "react";
import Image from "next/image";
import toneOpLogoBig from "../../public/toneopLogBig.png";
import fitLogo from "../../public/fitLogo.png";
import eatsLogo from "../../public/eatsLogo.png";
import careLogo from "../../public/careLogo.png";
const ContactUs = () => {
  return (
    <>
      <section className="w-full h-[95%] rounded-2xl bg-sky-300  relative">
        {/* Wrapper Div */}
        <section className="w-full h-full relative flex justify-center items-center">
          {/* Container Div for Component */}
          <div className="w-[740px] h-[626px] border bg-teal-400 relative flex justify-center">
            {/* Eclips Container div */}
            <div className="w-[740px] h-[594px] -top-[32px] border  absolute flex justify-center items-center">
              {/* Inner Eclips First */}
              <div className="Eclips w-[362px] h-[362px] rounded-full border border-[#F1F1F1] absolute flex justify-center items-center">
                <div className="w-[244px] h-[166px] relative Logo">
                  <Image src={toneOpLogoBig} fill alt="ToneOp Logo" />
                </div>
                    {/* ToneOp Care Eclips */}
                    <div className="w-[182px] h-[182px] rounded-full drop-shadow-2xl absolute bg-[#FCFCFC] top-full left-0 flex justify-center items-center z-10">
                        {/* Fit Logo Container */}
                        <div className="Logo w-[131px] h-[63px] relative">
                            <Image src={careLogo} fill alt="toneOpfit Logo" />
                        </div>
                    </div>
              </div>
              {/* Inner Eclips Second */}
              <div className="Eclips w-[443px] h-[443px] rounded-full  border border-[#F1F1F1] absolute">
                                              {/* ToneOp Fit Eclips */}
              <div className="w-[182px] h-[182px] rounded-full drop-shadow-2xl absolute bg-[#FCFCFC] top-[26px] right-full  flex justify-center items-center z-10">
                {/* Fit Logo Container */}
                <div className="Logo w-[131px] h-[63px] relative z-10">
                  <Image src={fitLogo} fill alt="toneOpfit Logo" />
                </div>
              </div>
              </div>
              {/* Inner Eclips Third */}
              <div className="Eclips w-[520px] h-[520px] rounded-full border border-[#F1F1F1] absolute">
                {/* ToneOp Eats Eclips */}
                <div className="w-[182px] h-[182px] rounded-full drop-shadow-2xl absolute bg-[#FCFCFC] top-[142px] left-full flex justify-center items-center z-10">
                {/* Eats Logo Container */}
                <div className="Logo w-[131px] h-[63px] relative">
                    <Image src={eatsLogo} fill alt="toneOpfit Logo" />
                </div>
                </div>
              </div>
              {/* Inner Eclips Fourth */}
              <div className="w-[593px] h-[593px] rounded-full border border-[#F9F9F9] absolute">
                
              </div>
            </div>

            {/* Inner Eclips Last */}
          
            
          </div>
        </section>
      </section>
    </>
  );
};

export { ContactUs };

<div className="w-[740px] h-[626px]  border border-[#F9F9F9] absolute">
{/* ToneOp Fit Eclips */}
<div className="w-[182px] h-[182px] rounded-full drop-shadow-2xl absolute bg-[#FCFCFC] top-[26px] left-0  flex justify-center items-center">
  {/* Fit Logo Container */}
  <div className="w-[131px] h-[63px] relative">
    <Image src={fitLogo} fill alt="toneOpfit Logo" />
  </div>
</div>
{/* ToneOp Eats Eclips */}
<div className="w-[182px] h-[182px] rounded-full drop-shadow-2xl absolute bg-[#FCFCFC] top-[142px] right-0 flex justify-center items-center">
  {/* Eats Logo Container */}
  <div className="w-[131px] h-[63px] relative">
    <Image src={eatsLogo} fill alt="toneOpfit Logo" />
  </div>
</div>
{/* ToneOp Care Eclips */}
<div className="w-[182px] h-[182px] rounded-full drop-shadow-2xl absolute bg-[#FCFCFC] bottom-0 left-[130px] flex justify-center items-center">
  {/* Fit Logo Container */}
  <div className="w-[131px] h-[63px] relative">
    <Image src={careLogo} fill alt="toneOpfit Logo" />
  </div>
</div>
</div>
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Pressable,
  Easing,
} from 'react-native';
import CustomHeader from '../../../../component/common/CustomHeader';
import MainLinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../../theme';
import {hp, moderateScale, wp} from '../../../../constants/constants';
import {LungsIcon, PlaysvgIcon, StopsvgIcon} from '../../../../assets/Icons';
import {fontSize} from '../../../../utils/fontUtils';
import fonts from '../../../../../android/app/src/main/assets/custom';
import MaskedView from '@react-native-masked-view/masked-view';
import Svg, {Defs, RadialGradient, Stop, Circle, Path, LinearGradient} from 'react-native-svg';
import {InfoSheet} from '../InfoSheet/InfoSheet';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const LungHealth = ({route}: {route: any}) => {
  const {toolId} = route.params;
  const navigation = useNavigation();
  const dotPosition = useRef(new Animated.Value(0)).current;
  const [phase, setPhase] = useState<any>('Start');
  const [timer, setTimer] = useState(59);
  const [isRunning, setIsRunning] = useState('stoped');
  const [countdown, setCountdown] = useState<number | null>(null); // Countdown state
  const [infoModal, setInfoModal] = useState<boolean>(false);
  function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  }

  function describeArc(
    cx: number,
    cy: number,
    r: number,
    startAngle: number,
    endAngle: number,
  ) {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M',
      start.x,
      start.y,
      'A',
      r,
      r,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(' ');
  }

  const SIZE = wp(362);
  const STROKE_WIDTH = 2;
  const percent = (value: number) => (value / SIZE) * 100;

  const radiusPx = (SIZE - STROKE_WIDTH) / 2;
  const radius = percent(radiusPx); // ~45.86
  const cx = percent(SIZE / 2); // 50
  const cy = percent(SIZE / 2); // 50

  // Example angle
  const animatedAngle = 70;

  const arcPath = describeArc(cx, cy, radius, 0, animatedAngle);
  const arcPath1 = describeArc(cx, cy, radius, animatedAngle, 270);
  const arcPath2 = describeArc(cx, cy, radius, 270,360);

  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      setCountdown(null);
      setPhase('Hold');
      setIsRunning('running'); // Start timer countdown now
      setTimer(59); // Reset timer when animation starts

      let animationDuration = 59 * 1000;

      const anim = Animated.timing(dotPosition, {
        toValue: 360,
        duration: animationDuration,
        easing: Easing.linear,
        useNativeDriver: true,
      });

      const id = dotPosition.addListener(({value}) => {
        const elapsed = (value / 360) * animationDuration;
        const remaining = Math.max(0, 59 - Math.floor(elapsed / 1000));
        setTimer(remaining);
      });

      anim.start(({finished}) => {
        dotPosition.removeListener(id);
        if (finished) {
          setPhase('Normal');
          setIsRunning('reset');
        } else {
          setPhase('Poor');
          setIsRunning('reset');
        }
      });
      return;
    }

    const interval = setInterval(() => {
      setCountdown(prev => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    if (!isRunning && timer > 15) {
      console.log('poor');
    }
  }, [timer]);

  const startTest = () => {
    if (isRunning === 'running') {
      // on stop
      dotPosition.stopAnimation(currentValue => {
        dotPosition.setValue(currentValue);
      });
      // setTimer(59);
      setIsRunning('reset');
    } else if (isRunning === 'reset') {
      dotPosition.stopAnimation(currentValue => {
        dotPosition.setValue(0);
      });
      setIsRunning('stoped');
      setPhase('Start');
      setTimer(59);
    } else {
      // on start
      setCountdown(3); // Start the 3-second countdown
      setPhase('Inhale');
    }
  };

  const GradientText = (props: any) => {
    return (
      <MaskedView maskElement={<Text {...props} />}>
        <MainLinearGradient
          colors={[colors.blue_E8F8F8, colors.blue_64E3E3, colors.teal_BCF4FB]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text {...props} style={[props.style, {opacity: 0}]} />
        </MainLinearGradient>
      </MaskedView>
    );
  };
  return (
    <View style={styles.container}>
      <CustomHeader title={'Lung Health Test'} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <MainLinearGradient
            colors={[colors.blue_3386C5, colors.teal_73CEC0]}
            style={styles.gradientContainer}>
            {/* Circle Effect */}
            <View style={styles.circleImageContainer}>
              <View style={styles.circleContainer}>
                {/* Radial Gradient Effect */}
                <Svg
                  height="100%"
                  width="100%"
                  style={[
                    styles.radialGradient,
                    {overflow: 'visible', margin: 2},
                  ]}
                  viewBox="0 0 100 100">
                  <Defs>
                    <RadialGradient
                      id={`grad`}
                      cx="50%"
                      cy="50%"
                      r="50%"
                      fx="50%"
                      fy="50%">
                      <Stop
                        offset="80%"
                        stopColor={`${colors.white_FFFFFF33}`}
                        stopOpacity="0"
                      />
                      <Stop
                        offset="100%"
                        stopColor={`${colors.white_FFFFFF33}`}
                        stopOpacity="0.2"
                      />
                    </RadialGradient>
                  </Defs>
                  {/* Green Arc: 0°–90° */}
                  <Path
                    d={arcPath}
                    stroke={`${colors.cEC6E6E}`}
                    strokeWidth={percent(STROKE_WIDTH)}
                    fill="none"
                    strokeLinecap="round"
                  />
                  <Path
                    d={arcPath1}
                    stroke={`${colors.mangoYellow}`}
                    strokeWidth={percent(STROKE_WIDTH)}
                    fill="none"
                    strokeLinecap="round"
                  />
                  <Path
                    d={arcPath2}
                    stroke={`${colors.green_3EFFA3}`}
                    strokeWidth={percent(STROKE_WIDTH)}
                    fill="none"
                    strokeLinecap="round"
                  />

                  <Circle cx="50%" cy="50%" r="50%" fill={`url(#grad)`} />
                </Svg>
                {/* Lungs Container */}
                <View style={styles.lungsContainer}>
                  {/* Heart Container */}
                  <View style={styles.heart}>
                    <LungsIcon width={84} height={82} />
                  </View>
                  {/* Result container */}
                  <View style={styles.status}>
                    <Text style={styles.title}>Test your lungs</Text>
                    <GradientText numberOfLines={1} style={styles.subtitle}>
                      {phase}
                    </GradientText>
                  </View>
                  {/* Timer Contaier */}
                  <View style={styles.timer}>
                    <Text style={styles.timerText}>
                      00:{timer < 10 ? `0${timer}` : timer}
                    </Text>
                  </View>
                </View>
                {/* Animation Container */}
                <Animated.View
                  style={[
                    styles.circleImage,
                    {
                      transform: [
                        {
                          rotate: dotPosition.interpolate({
                            inputRange: [0, 360],
                            outputRange: ['0deg', '360deg'],
                          }),
                        },
                      ],
                    },
                  ]}>
                  {/* Progress Indector */}
                  <MainLinearGradient
                    colors={[colors.white_DDDDDD, colors.white_FFFFFF]}
                    style={styles.dotContainer}>
                    <MainLinearGradient
                      colors={[colors.blue_3386C5, colors.teal_73CEC0]}
                      style={styles.dot}></MainLinearGradient>
                  </MainLinearGradient>
                </Animated.View>
              </View>
              {/* Waves Effect */}
              <View
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={styles.wave1} />
                <View style={styles.wave2} />
                <View style={styles.wave3} />
                <View style={styles.wave4} />
                <View style={styles.wave5} />
                <View style={styles.wave6} />
                <View style={[styles.wave7, {alignItems: 'center'}]}>
                  <Pressable
                    style={styles.rangeContainer}
                    onPress={() => setInfoModal(true)}>
                    {/* Icon */}
                    <Svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                      <Path
                        d="M6.83203 3.66683H8.16536V5.00016H6.83203V3.66683ZM6.83203 6.3335H8.16536V10.3335H6.83203V6.3335ZM7.4987 0.333496C3.8187 0.333496 0.832031 3.32016 0.832031 7.00016C0.832031 10.6802 3.8187 13.6668 7.4987 13.6668C11.1787 13.6668 14.1654 10.6802 14.1654 7.00016C14.1654 3.32016 11.1787 0.333496 7.4987 0.333496ZM7.4987 12.3335C4.5587 12.3335 2.16536 9.94016 2.16536 7.00016C2.16536 4.06016 4.5587 1.66683 7.4987 1.66683C10.4387 1.66683 12.832 4.06016 12.832 7.00016C12.832 9.94016 10.4387 12.3335 7.4987 12.3335Z"
                        fill="#666666"
                      />
                    </Svg>
                    <Text style={styles.paragraph}>Check Ranges</Text>
                  </Pressable>
                </View>
              </View>
            </View>

            {/* Button Container */}
            <View style={styles.btnContainer}>
              {/* Start button */}
              <View style={styles.startBotton}>
                <View style={styles.startBtnView}>
                  <View style={styles.startBtnV2}>
                    <Pressable style={styles.startBtn} onPress={startTest}>
                      {isRunning === 'running' ? (
                        <StopsvgIcon width={16} height={16} />
                      ) : isRunning === 'reset' ? (
                        <Icon name="reload" size={16} color={colors.cEC6E6E} />
                      ) : (
                        <PlaysvgIcon width={16} height={16} />
                      )}
                      <Text
                        style={[
                          styles.startBtnText,
                          {
                            color:
                              isRunning === 'running'
                                ? colors.cEC6E6E
                                : isRunning === 'reset'
                                ? colors.cEC6E6E
                                : colors.green,
                          },
                        ]}>
                        {isRunning === 'running'
                          ? 'stop'
                          : isRunning === 'reset'
                          ? 'Reset'
                          : 'start'}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </MainLinearGradient>
          {/* BMI Info Sheet Container */}
          <InfoSheet
            visible={infoModal}
            setVisible={setInfoModal}
            toolId={toolId}
            onCancel={() => setInfoModal(false)}
            navigation={navigation}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      {/* Countdown Overlay */}
      {countdown !== null && (
        <View style={styles.countDown}>
          <Text style={styles.countDownText}>{countdown}</Text>
        </View>
      )}
    </View>
  );
};
export default LungHealth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countDown: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: colors.blackTransparent80,
    alignItems: 'center',
  },
  countDownText: {
    fontSize: moderateScale(196),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.white,
    position: 'absolute',
    top: '50%',
  },
  gradientContainer: {
    flex: 1,
    paddingHorizontal: '7%',
    paddingTop: hp(69),
    paddingBottom: hp(50),
    justifyContent: 'space-between',
    position: 'relative',
  },
  circleImageContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  radialGradient: {
    position: 'absolute',
    overflow: 'visible',
  },
  circleImage: {
    flex: 1,
    borderRadius: moderateScale(362),
    position: 'relative',
  },
  circleContainer: {
    width: wp(362),
    height: wp(362),
    borderRadius: moderateScale(362),
    backgroundColor: colors.white_FFFFFF33,
    position: 'relative',
  },
  dotContainer: {
    width: wp(35),
    height: wp(35),
    borderRadius: moderateScale(35),
    position: 'absolute',
    left: '50%',
    transform: [{translateX: -wp(35 / 2)}, {translateY: -wp(35 / 2)}],
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: wp(13),
    height: wp(13),
    borderRadius: moderateScale(13),
  },
  lungsContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(40),
    paddingTop: hp(55),
    paddingBottom: hp(40),
  },

  heart: {
    alignItems: 'center',
  },
  status: {
    alignItems: 'center',
    marginTop: 33,
  },
  timer: {
    fontSize: fontSize.fs34,
    alignItems: 'center',
    marginTop: 18,
  },
  timerText: {
    fontSize: fontSize.fs34,
    fontFamily: fonts.PoppinsMedium,
    color: colors.white,
  },
  title: {
    fontSize: fontSize.fs16,
    fontFamily: fonts.PoppinsMedium,
    color: colors.white,
  },
  subtitle: {
    fontSize: moderateScale(55),
    fontFamily: fonts.PoppinsBold,
    color: colors.white,
  },
  startBtn: {
    width: wp(135),
    height: hp(64),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(60),
    flexDirection: 'row',
    gap: 4,
  },
  startBtnText: {
    fontSize: fontSize.fs18,
    fontFamily: fonts.PoppinsMedium,
    textTransform: 'capitalize',
  },
  btnContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: hp(44),
    left: '7%',
  },
  wave1: {
    width: wp(1230),
    height: wp(1230),
    borderRadius: moderateScale(1230),
    borderWidth: 1,
    borderColor: colors.white_FFFFFF08,
    transform: [{translateY: -hp(47)}],
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  wave2: {
    width: wp(1150),
    height: wp(1150),
    borderRadius: moderateScale(1150),
    borderWidth: 1,
    borderColor: colors.white_FFFFFF14,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  wave3: {
    width: wp(1056),
    height: wp(1056),
    borderRadius: moderateScale(1056),
    borderWidth: 1,
    borderColor: colors.white_FFFFFF24,
    position: 'absolute',
  },
  wave4: {
    width: wp(978),
    height: wp(978),
    borderRadius: moderateScale(978),
    borderWidth: 1,
    borderColor: colors.white_FFFFFF2E,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  wave5: {
    width: wp(896),
    height: wp(896),
    borderRadius: moderateScale(896),
    borderWidth: 1,
    borderColor: colors.white_FFFFFF3D,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  wave6: {
    width: wp(820),
    height: wp(820),
    borderRadius: moderateScale(820),
    borderWidth: 1,
    borderColor: colors.white_FFFFFF52,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  wave7: {
    width: wp(760),
    height: wp(760),
    borderRadius: moderateScale(760),
    borderWidth: 1,
    borderColor: colors.white_FFFFFF66,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  paragraph: {
    fontSize: moderateScale(12),
    fontFamily: fonts.PoppinsMedium,
    color: colors.c666666,
  },
  rangeContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: wp(12),
    paddingVertical: hp(10),
    borderRadius: moderateScale(48),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    zIndex: 1,
    position: 'relative',
    marginBottom: hp(24),
  },
  startBotton: {
    borderWidth: 1,
    borderColor: colors.white_FFFFFF80,
    padding: 1,
    borderRadius: 100,
  },
  startBtnView: {
    borderWidth: 1,
    borderColor: colors.white_FFFFFF80,
    padding: 1,
    borderRadius: 100,
  },
  startBtnV2: {
    borderWidth: 1,
    borderColor: colors.white,
    padding: 1,
    borderRadius: 100,
  },
});
