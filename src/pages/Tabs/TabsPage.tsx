import Tabs from "../../components/Tabs/Tabs";

function TabsPage() {
  const items = [
    {
      key: "1",
      label: "html",
      content: (
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum,
          doloribus.
        </p>
      ),
    },
    {
      key: "2",
      label: "css",
      content: (
        <p>
          aperiam optio doloremque provident esse aut nobis earum rerum
          excepturi tempora reprehenderit? Commodi, neque praesentium.
        </p>
      ),
    },
    {
      key: "3",
      label: "js",
      content: (
        <p>
          dsf try t ght tgfhgjfdgfht fgdfgcdg nfhmtfd gh fbgvt hfgtggh ghgmf g
          gfhgmjhd
        </p>
      ),
    },
  ];
  return <Tabs items={items} />;
}

export default TabsPage;
