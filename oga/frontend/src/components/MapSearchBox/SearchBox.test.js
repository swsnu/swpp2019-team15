import React from "react";
import { shallow, mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import SearchBox from "./SearchBox";
import TextField from "@material-ui/core/TextField";

configureMockStore();

describe("<SearchBox/>", () => {
    let box;
    let mapApi = jest.mock();
    mapApi.places = jest.mock();

    let mockClearInstanceListeners = jest.fn(() => {});
    mapApi.event = { clearInstanceListeners: mockClearInstanceListeners };

    beforeEach(() => {
        box = <SearchBox />;
    });

    it("should render without errors", () => {
        const component = mount(box);
        const wrapper = component.find("SearchBox");
        expect(wrapper.length).toBe(1);
    });

    it("should handle inputs", () => {
        const component = shallow(box);
        const wrapper = component.find(TextField);
        wrapper.value = "seoul";
        expect(wrapper.value).toBe("seoul");
    });

    it("should call mock upon unmount ", () => {
        const component = mount(box);

        const componentWillUnmount = jest.spyOn(
            component.instance(),
            "componentWillUnmount"
        );
        component.unmount();
        expect(componentWillUnmount).toHaveBeenCalledTimes(1);
    });

    it("Should render TextField", () => {
        const component = mount(box);
        const wrapper = component.find(TextField);
        wrapper.getDOMNode().value = "test";
        expect(wrapper).toHaveLength(1);
        expect(wrapper.getDOMNode().value).toBe("test");
    });

    it("should clear Searchbox when clear button clicked", () => {
        const component = mount(box);
        const wrapper = component.find(TextField);
        component
            .find("#clear-search-button")
            .hostNodes()
            .simulate("click");
        expect(wrapper.getDOMNode().value).toBe(undefined);
    });
});
