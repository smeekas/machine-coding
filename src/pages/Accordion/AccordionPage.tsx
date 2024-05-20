import Accordion from "../../components/Accordion/Accordion";

function AccordionPage() {
  return (
    <Accordion
      items={[
        { children: <p>hello</p>, key: "1", label: "p tag" },
        { children: <div>hehe</div>, key: "2", label: "div tsag" },
        {
          children: (
            <div>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
                culpa quis natus rerum maxime, voluptatum consequatur fuga
                soluta asperiores magni ab assumenda? Neque sit minus nihil aut
                eum dolore quibusdam, cumque nesciunt laboriosam fugiat minima!
                Quam eaque error corrupti a magni quaerat laborum doloribus
                reprehenderit est, harum recusandae corporis ab. Neque quos
                veritatis exercitationem recusandae, dolor quaerat amet
                doloribus debitis aperiam assumenda laudantium in molestiae,
                fugiat perferendis at sed fugit culpa? Adipisci veritatis eos
                nesciunt quibusdam odit ab voluptas veniam porro reprehenderit
                quod nisi modi neque vel quae voluptatibus nemo delectus
                asperiores doloribus suscipit obcaecati nam, labore, accusamus
                necessitatibus. Cupiditate?
              </span>
            </div>
          ),
          key: "11",
          label: "p tag",
        },
      ]}
    />
  );
}

export default AccordionPage;
