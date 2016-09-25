
/**
 * @class Events
 *
 * @prop {object} events - Hash table of events and their assigned handler callbacks
 */
export default class Events {
    events = {};

    /**
     * Set handler on event
     *
     * @param {string} event - Event name to set handler to
     * @param {func} handler - Handler function callback
     * @return {void}
     */
    on(event, handler) {
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
    off(event) {
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
    trigger(event, params) {
        if (this.events[event] && this.events[event].length) {
            this.events[event].forEach(handler => handler(params));
        }
    }
}
