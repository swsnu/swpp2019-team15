import React from "react";
import { shallow, mount } from "enzyme";
import AnswerView from "./AnswerView";
import { jssPreset } from "@material-ui/core";
import ShallowRenderer from "react-test-renderer/shallow";
import moment from "moment";

describe("<AnswerView/>", () => {
  it("renders without errors", () => {
    const component = shallow(<AnswerView />);
    const wrapper = component.find(".AnswerView");
    expect(wrapper.length).toBe(1);
  });

  it("renders without errors", () => {
    const component = shallow(<AnswerView is_answered={true} />);
    const wrapper = component.find(".AnswerView");
    expect(wrapper.length).toBe(1);
  });

  it("displays moment time format", () => {
    jest.mock("moment", () => () => ({
      format: () => "2019-11-10T20:45:00+00:00"
    }));
    const renderer = new ShallowRenderer();
    const component = shallow(<AnswerView />);
    const wrapper = component.find(".publish_date_time");
    expect(wrapper).toMatchSnapshot();
  });
});
