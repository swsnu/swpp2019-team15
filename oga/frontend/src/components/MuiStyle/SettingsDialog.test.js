import React from "react";
import { mount } from "enzyme";
import SettingsDialog from "./SettingsDialog";

const mockOpenSettings = jest.fn();

describe("<SettingsDialog />", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render", () => {
        const component = mount(<SettingsDialog />);
        expect(component.length).toBe(1);
    });

    it("should redirect to settings page when clicked", () => {
        const component = mount(
            <SettingsDialog openSettings={mockOpenSettings} />
        );
        const wrapper = component.find("#settings-button");
        wrapper.hostNodes().simulate("click");
        expect(mockOpenSettings).toHaveBeenCalled();
    });

    xit("should close dialog when Cancel is clicked", () => {
        const mock = jest.fn().mockReturnValue("close");
        const component = mount(<SettingsDialog handleClose={mock} />);
        const wrapper = component.find("#cancel-button");
        wrapper.hostNodes().simulate("click");
        // wrapper.update();
        expect(mock).toHaveBeenCalled();
    });
});
