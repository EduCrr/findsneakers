import * as C from "./styles";
import { navigationLinks } from "../../../utils/data";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();

  return (
    <C.Content>
      <div className="logo">Findsneakeroom</div>
      <div className="menuSite">
        <ul>
          {navigationLinks.map((item, k) => (
            <li
              className={[
                "link",
                item.path.includes(router.pathname) ? "linkActive" : "link",
              ].join(" ")}
              key={k}
            >
              <Link href={item.path[0]}>
                <a>{item.label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </C.Content>
  );
};
