'use client';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { DashboardNav, PropertyList, PropertyComponent } from "@ui/index";
import { db } from "@web/firebase";
import { getDocs, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import CondoUnitAdapter from "../../../native/components/CondoUnitAdapter";
import PropertyAdapter from "../../../native/components/PropertyAdapter";


const Page = () => {
    const [authUser] = useAuthState(auth);
    const [ownedProperties, setOwnedProperties] = useState<Object[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [selectedProperty, setSelectedProperty] = useState<Object>();

    useEffect(() => {
        const fetchData = async () => {
            const propertyList: Object[] = [];
            try {
                const propertiesCollectionSnapshot = await getDocs(
                    collection(db, "properties")
                );

                propertiesCollectionSnapshot.forEach(async (propertyDoc) => {
                    const unitList: Object[] = [];
                    const condoUnitsSnapshot = await getDocs(
                        collection(db, "properties", propertyDoc.id, "condoUnits")
                    );
                    const userUID = await localStorage.getItem("userUID");
                    let stopper = true;
                    let propertyData = propertyDoc.data();

                    condoUnitsSnapshot.forEach((condoUnitDoc) => {
                        let condoData = condoUnitDoc.data();
                        let condoId = condoUnitDoc.id;

                        if (condoData.owner === userUID && stopper) {
                            const condoUnit = new CondoUnitAdapter(
                                condoId,
                                {
                                    includes: condoData.condoFees.includes,
                                    monthlyFee: condoData.condoFees.monthlyFee,
                                },
                                condoData.lockerId,
                                {
                                    contact: condoData.occupantInfo.contact,
                                    name: condoData.occupantInfo.name,
                                },
                                condoData.owner,
                                condoData.parkingSpotId,
                                condoData.size,
                                condoData.unitId
                            );
                            unitList.push(condoUnit.toJSON());
                            console.log(unitList);
                            stopper = false;
                        }
                    });
                    if (propertyData.owner === userUID) {
                        const property = new PropertyAdapter(
                            propertyDoc.id,
                            propertyData.address,
                            propertyData.lockerCount,
                            propertyData.owner,
                            propertyData.parkingCount,
                            propertyData.propertyName,
                            propertyData.unitCount,
                            unitList
                        );
                        propertyList.push(property.toJSON());
                        setOwnedProperties(propertyList);
                        if (propertyList.length > 0) {
                            setSelectedProperty(propertyList[0]);
                        }
                    }
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="h-screen bg-gradient-to-r from-[#87A8FA] to-[#87CCFA] overflow-hidden">
            <DashboardNav />
            <div className="flex h-full">
                {isLoading ? <h1>Loading...</h1> : <PropertyList ownedProperties={ownedProperties} setSelectedProperty={setSelectedProperty} />}
                {isLoading ? <h1>Loading...</h1> : <PropertyComponent selectedProperty={selectedProperty} />}
            </div>
        </div>
    );
};
export default Page;