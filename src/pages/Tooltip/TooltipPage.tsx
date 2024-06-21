import Tooltip from "../../components/PopOver/Tooltip";

function TooltipPage() {
  return (
    <Tooltip title="new page" mode="hover" mouseFollow>
      <div onClick={() => console.log("DIVVVVV")}>
        TooltipPage Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Aperiam nesciunt reprehenderit veniam officiis, ipsa omnis ea, ex
        molestiae voluptatum repudiandae architecto nisi. Doloribus fugit nulla
        maiores corporis dicta sunt accusamus ab voluptatum id dolorem debitis
        quos quidem ea sed ullam, reiciendis quia error iusto eos nobis porro
        mollitia dolorum illum sapiente. Tenetur quae, architecto ratione dolor
        rem totam repudiandae facere perspiciatis nemo fugiat illo ea quis
        aperiam corrupti est libero autem at asperiores deserunt necessitatibus?
        Hic labore, error velit, facilis accusamus, dolores nam quia magnam
        ipsum non aliquam ipsam perferendis odio saepe repellendus a tempore
        officia doloremque accusantium corrupti expedita.
      </div>
    </Tooltip>
  );
}

export default TooltipPage;
