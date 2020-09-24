import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  styles = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#212121',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#212121',
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'administrative.country',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'administrative.neighborhood',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.business',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#181818',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#1b1b1b',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#2c2c2c',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#8a8a8a',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#373737',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#3c3c3c',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [
        {
          color: '#4e4e4e',
        },
      ],
    },
    {
      featureType: 'road.local',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'transit',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#000000',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#3d3d3d',
        },
      ],
    },
  ];

  slideOpts = {
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    on: {
      beforeInit: function () {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}cube`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: false,
          virtualTranslate: true,
        };

        this.params = Object.assign(this.params, overwriteParams);
        this.originalParams = Object.assign(
          this.originalParams,
          overwriteParams
        );
      },
      setTranslate: function () {
        const swiper = this;
        const {
          $el,
          $wrapperEl,
          slides,
          width: swiperWidth,
          height: swiperHeight,
          rtlTranslate: rtl,
          size: swiperSize,
        } = swiper;
        const params = swiper.params.cubeEffect;
        const isHorizontal = swiper.isHorizontal();
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        let wrapperRotate = 0;
        let $cubeShadowEl;
        if (params.shadow) {
          if (isHorizontal) {
            $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
            if ($cubeShadowEl.length === 0) {
              $cubeShadowEl = swiper.$(
                '<div class="swiper-cube-shadow"></div>'
              );
              $wrapperEl.append($cubeShadowEl);
            }
            $cubeShadowEl.css({ height: `${swiperWidth}px` });
          } else {
            $cubeShadowEl = $el.find('.swiper-cube-shadow');
            if ($cubeShadowEl.length === 0) {
              $cubeShadowEl = swiper.$(
                '<div class="swiper-cube-shadow"></div>'
              );
              $el.append($cubeShadowEl);
            }
          }
        }

        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let slideIndex = i;
          if (isVirtual) {
            slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
          }
          let slideAngle = slideIndex * 90;
          let round = Math.floor(slideAngle / 360);
          if (rtl) {
            slideAngle = -slideAngle;
            round = Math.floor(-slideAngle / 360);
          }
          const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          let tx = 0;
          let ty = 0;
          let tz = 0;
          if (slideIndex % 4 === 0) {
            tx = -round * 4 * swiperSize;
            tz = 0;
          } else if ((slideIndex - 1) % 4 === 0) {
            tx = 0;
            tz = -round * 4 * swiperSize;
          } else if ((slideIndex - 2) % 4 === 0) {
            tx = swiperSize + round * 4 * swiperSize;
            tz = swiperSize;
          } else if ((slideIndex - 3) % 4 === 0) {
            tx = -swiperSize;
            tz = 3 * swiperSize + swiperSize * 4 * round;
          }
          if (rtl) {
            tx = -tx;
          }

          if (!isHorizontal) {
            ty = tx;
            tx = 0;
          }

          const transform$$1 = `rotateX(${
            isHorizontal ? 0 : -slideAngle
          }deg) rotateY(${
            isHorizontal ? slideAngle : 0
          }deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
          if (progress <= 1 && progress > -1) {
            wrapperRotate = slideIndex * 90 + progress * 90;
            if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
          }
          $slideEl.transform(transform$$1);
          if (params.slideShadows) {
            // Set shadows
            let shadowBefore = isHorizontal
              ? $slideEl.find('.swiper-slide-shadow-left')
              : $slideEl.find('.swiper-slide-shadow-top');
            let shadowAfter = isHorizontal
              ? $slideEl.find('.swiper-slide-shadow-right')
              : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(
                `<div class="swiper-slide-shadow-${
                  isHorizontal ? 'left' : 'top'
                }"></div>`
              );
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(
                `<div class="swiper-slide-shadow-${
                  isHorizontal ? 'right' : 'bottom'
                }"></div>`
              );
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length)
              shadowBefore[0].style.opacity = Math.max(-progress, 0);
            if (shadowAfter.length)
              shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
        }
        $wrapperEl.css({
          '-webkit-transform-origin': `50% 50% -${swiperSize / 2}px`,
          '-moz-transform-origin': `50% 50% -${swiperSize / 2}px`,
          '-ms-transform-origin': `50% 50% -${swiperSize / 2}px`,
          'transform-origin': `50% 50% -${swiperSize / 2}px`,
        });

        if (params.shadow) {
          if (isHorizontal) {
            $cubeShadowEl.transform(
              `translate3d(0px, ${swiperWidth / 2 + params.shadowOffset}px, ${
                -swiperWidth / 2
              }px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`
            );
          } else {
            const shadowAngle =
              Math.abs(wrapperRotate) -
              Math.floor(Math.abs(wrapperRotate) / 90) * 90;
            const multiplier =
              1.5 -
              (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2 +
                Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2);
            const scale1 = params.shadowScale;
            const scale2 = params.shadowScale / multiplier;
            const offset$$1 = params.shadowOffset;
            $cubeShadowEl.transform(
              `scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${
                swiperHeight / 2 + offset$$1
              }px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`
            );
          }
        }

        const zFactor =
          swiper.browser.isSafari || swiper.browser.isUiWebView
            ? -swiperSize / 2
            : 0;
        $wrapperEl.transform(
          `translate3d(0px,0,${zFactor}px) rotateX(${
            swiper.isHorizontal() ? 0 : wrapperRotate
          }deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`
        );
      },
      setTransition: function (duration) {
        const swiper = this;
        const { $el, slides } = swiper;
        slides
          .transition(duration)
          .find(
            '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left'
          )
          .transition(duration);
        if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
          $el.find('.swiper-cube-shadow').transition(duration);
        }
      },
    },
  };
  constructor() {}

  ngOnInit() {}
}
