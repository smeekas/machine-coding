import Tooltip from "../../components/PopOver/Tooltip";

function TooltipPage() {
  return (
    <Tooltip title="new page" mode="hover" mouseFollow>
      <div onClick={() => console.log("DIVVVVV")}>TooltipPage</div>
    </Tooltip>
  );
}

export default TooltipPage;
