<template>
  <form class="tesla-battery">
    <h1>{{ title }}</h1>

    <!-- TeslaCarComponent -->
    <tesla-car wheels="wheels"
               speed="[speed.value]" />
    <!-- End TeslaCarComponent -->

    <!-- TeslaStatsComponent -->
    <div class="tesla-stats">
      <ul>
        <li v-for="stat of stats">
          <div :class="'tesla-stats-icon tesla-stats-icon--'+stat.model"></div>
          <p>{{ stat.miles }}
            <span>MI</span>
          </p>
        </li>
      </ul>
    </div>
    <!-- EndTeslaStatsComponent -->

    <div class="tesla-controls cf">

      <!-- TeslaCounterComponent for speed -->
      <div class="tesla-counter">
        <p class="tesla-counter__title">Speed</p>
        <div class="tesla-counter__container cf">
          <div class="tesla-counter__item"
               tabindex="0"
               (blur)="onBlurSpeed($event)"
               (keydown)="onKeyUpSpeed($event)"
               (focus)="onFocusSpeed($event)">
            <p class="tesla-counter__number">
              {{speed.value}}
              <span>kmh</span>
            </p>
            <div class="tesla-counter__controls"
                 tabindex="-1">
              <button tabindex="-1"
                      type="button"
                      @click="incrementSpeed"
                      disabled="speed.value === speed.max"></button>
              <button tabindex="-1"
                      type="button"
                      @click="decrementSpeed"
                      disabled="speed.value === speed.min"></button>
            </div>
          </div>
        </div>
      </div>
      <!-- End TeslaCounterComponent for speed -->

      <div class="tesla-climate cf">

        <!-- TeslaCounterComponent for outside temperature -->
        <div class="tesla-counter">
          <p class="tesla-counter__title">Outside Temperature</p>
          <div class="tesla-counter__container cf">
            <div class="tesla-counter__item"
                 tabindex="0"
                 @blur="onBlurTemperature()"
                 @keydown="onKeyUpTemperature()"
                 @focus="onFocusTemperature()">
              <p class="tesla-counter__number">
                temperature.value
                <span>°</span>
              </p>
              <div class="tesla-counter__controls"
                   tabindex="-1">
                <button tabindex="-1"
                        type="button"
                        @onClick="incrementTemperature"
                        :disabled="temperature.value === temperature.max"></button>
                <button tabindex="-1"
                        type="button"
                        @onClick="decrementTemperature"
                        :disabled="temperature.value === temperature.min"></button>
              </div>
            </div>
          </div>
        </div>
        <!-- End TeslaCounterComponent for outside temperature -->

        <!-- TeslaClimateComponent -->
        <div>
          <!-- the class tesla-heat must be added only if the limit is achieved -->
          <label class="tesla-climate__item tesla-heat"
                 :class="{'tesla-climate__item--active': climate.value, 'tesla-climate__item--focused': climate.focused === climate.value}">
            <p class="heat">{{ (limitHeat ? 'ac' : 'heat') }} {{ climate.value ? 'on' : 'off' }}</p>
            <i class="tesla-climate__icon"></i>
            <input type="checkbox"
                   name="climate"
                   :checked="true"
                   @click="changeClimate()"
                   @blur="onBlurClimate()"
                   @focus="onFocusClimate()">
          </label>
        </div>
        <!-- End TeslaClimateComponent -->

      </div>

      <!-- TeslaWheelsComponent -->
      <div class="tesla-wheels">
        <p class="tesla-wheels__title">Wheels</p>
        <div class="tesla-wheels__container cf">
          <label *ngFor="size of wheels.sizes"
                 :key="size"
                 :class="[{'tesla-wheels__item--active' : (wheels.value === size), 'tesla-wheels__item--focused': (wheels.focused === size),'tesla-wheels__item': true}, `tesla-wheels__item--${size}`]">
            <input type="radio"
                   name="wheelsize"
                   :value="size"
                   @blur="onBlurWheels()"
                   @click="changeWheelSize(size)"
                   @focus="onFocusWheels(size)"
                   :checked="wheels.value === size">
            <p>
              {size}"
            </p>
          </label>
        </div>
      </div>
      <!-- End TeslaWheelsComponent -->

    </div>
    <div class="tesla-battery__notice">
      <p>
        The actual amount of range that you experience will vary based on your particular use conditions. See how particular use conditions may affect your range in our simulation model.
      </p>
      <p>
        Vehicle range may vary depending on the vehicle configuration, battery age and condition, driving style and operating, environmental and climate conditions.
      </p>
    </div>
  </form>
</template>

<script>
import TeslaCar from './components/tesla-car.component';

import teslaService from './tesla-battery.service';

export default {
  name: 'tesla-battery',
  components: {
    TeslaCar,
  },
  created() {
    this.metrics = teslaService.getModelData();
  },
  data() {
    return {
      title: 'Ranger Per Charge',
      models: ['60', '60D', '75', '75D', '90D', 'P100D'],
      wheels: {
        sizes: [19, 21],
        value: 19,
        focused: null,
      },
      climate: {
        value: true,
        focused: false,
      },
      temperature: {
        value: 20,
        focused: false,
        min: -10,
        max: 40,
        step: 10,
      },
      speed: {
        value: 55,
        focused: false,
        min: 45,
        max: 70,
        step: 5,
      },
      metrics: [],
    };
  },
  computed: {
    stats() {
      return this.models.map(model => {
        const miles = this.metrics[model][this.wheels.value][
          this.climate.value ? 'on' : 'off'
        ].speed[this.speed.value][this.temperature.value];
        return {
          model,
          miles,
        };
      });
    },
    limitHeat() {
      // return boolean that is true if the temperature of the tesla is above 10 degrees
    },
  },
  methods: {
    changeClimate() {
      this.climate.value = !this.climate.value;
    },
    changeWheelSize(size) {
      this.tesla.wheels = size;
    },
    onBlurWheels() {
      this.wheels.focused = null;
    },
    onFocusWheels(size) {
      this.wheels.focused = size;
    },
    onBlurClimate() {
      this.tesla.climate.focused = false;
    },
    onFocusClimate() {
      this.tesla.climate.focused = true;
    },
    incrementTemperature() {},
    decrementTemperature() {
      if (this.temperature.value > this.temperature.min) {
        this.temperature.value = this.temperature.value - this.temperature.step;
      }
    },
    onFocusTemperature(event) {
      this.temperature.focused = false;
      event.preventDefault();
      event.stopPropagation();
    },
    onBlurTemperature(event) {
      this.temperature.focused = true;
      event.preventDefault();
      event.stopPropagation();
    },
    onKeyUpTemperature(event) {
      let handlers = {
        ArrowDown: () => this.decrementTemperature(),
        ArrowUp: () => this.incrementTemperature(),
      };

      if (handlers[event.code]) {
        handlers[event.code]();
        event.preventDefault();
        event.stopPropagation();
      }
    },
    incrementSpeed() {
      if (this.speed.value < this.speed.max) {
        this.speed.value = this.speed.value + this.speed.step;
      }
    },
    decrementSpeed() {},
    onFocusSpeed(event) {
      this.speed.focused = false;
      event.preventDefault();
      event.stopPropagation();
    },
    onBlurSpeed(event) {
      this.speed.focused = true;
      event.preventDefault();
      event.stopPropagation();
    },
    onKeyUpSpeed(event) {
      let handlers = {
        ArrowDown: () => this.decrementSpeed(),
        ArrowUp: () => this.incrementSpeed(),
      };

      if (handlers[event.code]) {
        handlers[event.code]();
        event.preventDefault();
        event.stopPropagation();
      }
    },
  },
  filters: {
    lowercase(value) {
      return !value ? '' : value.toLowerCase();
    },
  },
};
</script>
