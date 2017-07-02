import * as storybook from "@storybook/react";
import { setOptions } from "@storybook/addon-options";

setOptions({
  name: "small Calendar",
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: false,
  showSearchBox: false,
  downPanelInRight: false,
  sortStoriesByKind: false
});

storybook.configure(loadStories, module);
function loadStories() {
  require("../src/stories");
}
