// @flow

type EventsType = {[key: string]: Array<() => void>};

/**
 * @class Events
 *
 * @prop {object} events - Hash table of events and their assigned handler callbacks
 */
export default class Events {
    events: EventsType = {};

    /**
     * Set handler on event
     *
     * @param {string} event - Event name to set handler to
     * @param {func} handler - Handler function callback
     * @return {void}
     */
    on(event: string, handler: () => void): void {
        if (!this.events[event]) {
            this.events[event] = [];
        }

        this.events[event].push(handler);
    }

    /**
     * Remove all event handler for the given event
     *
     * @param {string} event - Event name to remove handler from
     * @return {void}
     */
    off(event: string): void {
        if (this.events[event]) {
            this.events[event] = [];
        }
    }

    /**
     * Trigger event with params
     *
     * @param {string} event - Event to trigger
     * @param {object} params - Parameters to pass to event handler
     * @return {void}
     */
    trigger(event: string, params: {}): void {
        if (this.events[event] && this.events[event].length) {
            this.events[event].forEach(handler => handler(params));
        }
    }
}
