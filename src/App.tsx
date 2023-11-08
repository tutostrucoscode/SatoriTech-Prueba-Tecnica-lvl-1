/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Container,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Character,
  Episode,
  getCharacterByUrl,
  getEpisodeByUrl,
  getLocationById,
} from "./api/RickAndMortyAPI";
import CardUi from "./features/ui/card/cardUi";
import ModalUi from "./features/ui/modal/modalUi";
import InputSearchUi from "./features/ui/inputSearch/inputSearchUi";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [backgroundColor, setBackgroundColor] = useState("white");
  const [locationId, setLocationId] = useState("");
  const [residents, setResidents] = useState<
    (Character & { episodes?: (Episode | null)[] })[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [selectedResident, setSelectedResident] = useState<Character | null>(
    null
  );

  useEffect(() => {
    updateBackgroundColor(locationId);
  }, [locationId]);

  const handleLocationChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const id = event.target.value;
    setLocationId(id);

    if (id.trim() === "") {
      setResidents([]);
      return;
    }

    setLoading(true);

    try {
      const location = await getLocationById(id);
      const residentPromises = location.residents
        .slice(0, 5)
        .map((url) => getCharacterByUrl(url));
      let residentsData = await Promise.all(residentPromises);
      console.log("residentsData:", residentsData);
      console.log("location.residents:", location.residents);

      // Fetching additional details for each resident
      residentsData = await Promise.all(
        residentsData.map(async (resident) => {
          // Assuming resident.episode is an array of episode URLs
          const episodePromises = resident.episode
            .slice(0, 3)
            .map(async (episodeUrl) => {
              try {
                return await getEpisodeByUrl(episodeUrl);
              } catch (error) {
                console.error(
                  `Failed to fetch episode from ${episodeUrl}`,
                  error
                );
                return null; // or a default error object
              }
            });

          const episodes = await Promise.all(episodePromises);
          return { ...resident, episodes }; // Add the episode details here
        })
      );
      // Sorting residents alphabetically by name
      residentsData.sort((a, b) => a.name.localeCompare(b.name));

      console.log(residentsData);

      setResidents(residentsData);
    } catch (error) {
      console.error("There was an error fetching the location details:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateBackgroundColor = (locationId: string) => {
    const idNum = parseInt(locationId);
    if (idNum < 50) {
      setBackgroundColor("green"); // Verde para ID menor a 50
    } else if (idNum >= 50 && idNum < 80) {
      setBackgroundColor("blue"); // Azul para ID entre 50 y 79
    } else if (idNum >= 80) {
      setBackgroundColor("red"); // Rojo para ID mayor o igual a 80
    } else {
      setBackgroundColor("white"); // Blanco para cualquier otro caso (por ejemplo, si el ID no es un número)
    }
  };

  const handleImageClick = (resident: Character) => {
    setSelectedResident(resident);
    onOpen();
  };

  return (
    <div style={{ backgroundColor: backgroundColor, height: "100vh" }}>
      <Box
        as="header"
        pos="sticky"
        top="0px"
        zIndex="11"
        backgroundColor="#FFFFFF"
        left="0px"
        right="0px"
        width="100%"
      >
        <Box as="div" h="4.5rem" marginInlineEnd="auto" borderColor="#E2E8F0">
          <Flex
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
            paddingInlineEnd="1.5rem"
          >
            <div>
              <InputSearchUi
                handleLocationChange={handleLocationChange}
                locationId={locationId}
                loading={loading}
              />
            </div>
          </Flex>
        </Box>
      </Box>
      <Box>
        <Container centerContent>
          <Flex justifyContent="center">
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              {residents.map((resident) => (
                <GridItem w="100%" key={resident.id}>
                  <CardUi
                    resident={resident}
                    handleImageClick={handleImageClick}
                  />
                </GridItem>
              ))}
            </Grid>
          </Flex>
        </Container>
      </Box>
      <ModalUi
        isOpen={isOpen}
        onClose={onClose}
        selectedResident={selectedResident}
      />
    </div>
  );
};

export default App;
