import {
  ComponentOverride,
  ComponentOverrideObject,
  ComponentSettingsField,
  Field,
  FieldOverride,
  FieldOverrideObject,
} from '../types';
import { Emitter } from '../Emitter';
import { Builder } from '../Builder';

export declare class Overrides extends Emitter {
  constructor(options?: { builder: Builder });

  /** Adds a new component or field override */
  add(
    override: ComponentOverride | ComponentOverrideObject | FieldOverride |
      FieldOverrideObject
  ): ComponentOverride | FieldOverride;

  /**
   * Retrieves an override for a component or a field.
   * If the override type is 'component' and the output is set to 'field',
   * the override will be returned as a field override object, potentially
   * using a component setting field as base.
   *
   * Example:
   * this.get('component', 'title', {
   *   output: 'field',
   *   setting: new ComponentSettingsField({
   *     key: 'content',
   *     type: 'textarea',
   *   }),
   * })
   *
   * Will result in:
   * {
   *   type: 'textarea',
   *   render: () => ...,
   * }
   * */
  get(type: 'component' | 'field', target: string, options?: {
    output?: 'field',
    setting?: ComponentSettingsField,
  }): ComponentOverride | FieldOverrideObject;

  /** Removes an override by its id (if available) */
  remove (id: string): void;

  /** Merges overrides into a single non-typed object */
  merge(overrides: Array<ComponentOverride | FieldOverride>): object;

  /** Returns all available overrides */
  all(): Array<ComponentOverride | FieldOverride>;
}
