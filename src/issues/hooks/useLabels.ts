import { useQuery } from "@tanstack/react-query";
import { getLabels } from "../services/labels.service";

export const useLabels = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
    staleTime: 1000 * 60 * 5, // 5 minutos
    // initialData: [
    //   {
    //     id: 791921801,
    //     node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
    //     url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
    //     name: "❤️",
    //     color: "ffffff",
    //     default: false,
    //   },
    //   {
    //     id: 69105383,
    //     node_id: "MDU6TGFiZWw2OTEwNTM4Mw==",
    //     url: "https://api.github.com/repos/facebook/react/labels/Browser:%20IE",
    //     name: "Browser: IE",
    //     color: "c7def8",
    //     default: false,
    //   },
    // ],
    // placeholderData: [
    //   {
    //     id: 791921801,
    //     node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
    //     url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
    //     name: "❤️",
    //     color: "ffffff",
    //     default: false,
    //   },
    //   {
    //     id: 69105383,
    //     node_id: "MDU6TGFiZWw2OTEwNTM4Mw==",
    //     url: "https://api.github.com/repos/facebook/react/labels/Browser:%20IE",
    //     name: "Browser: IE",
    //     color: "c7def8",
    //     default: false,
    //   },
    // ],
  });
  return {
    data,
    isLoading,
    error,
  };
};
