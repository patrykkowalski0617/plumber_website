window.addEventListener("load", function() {
    "use strict";
    const bgElements = document.querySelectorAll(".bg-svg-desktop");
    const bgElementsData = [];
    let documentW = document.body.offsetWidth;

    const createParts = (noOfParts, parent) => {
        for (let i = 0; i < noOfParts; i++) {
            const part = document.createElement("DIV");
            part.setAttribute("class", "bg-part");
            parent.appendChild(part);
        }
    };

    const styleParts = (
        noOfParts,
        lengthOfRow,
        positions,
        background,
        documentW,
        bottom
    ) => {
        const part = background.querySelectorAll(".bg-part");
        for (let i = 0; i < part.length; i++) {
            part[i].style.width = documentW / lengthOfRow + "px";
            part[i].style.height = documentW / lengthOfRow + "px";
            part[i].style.backgroundPositionX =
                "calc(100% / " + (noOfParts - 1) + " * " + i + ")";

            const positionL = positions[i * 2 + 1];
            const positionT = positions[i * 2];
            part[i].style.left = (documentW / lengthOfRow) * positionL + "px";

            if (bottom === "true") {
                part[i].style.bottom =
                    (documentW / lengthOfRow) * positionT + "px";
            } else {
                part[i].style.top =
                    (documentW / lengthOfRow) * positionT + "px";
            }
        }
    };

    // On load: create and style parts
    let positions, noOfParts, lengthOfRow, bottom;
    for (let i = 0; i < bgElements.length; i++) {
        positions = bgElements[i].getAttribute("data-positions").split(",");
        noOfParts = positions.length / 2;
        lengthOfRow = bgElements[i].getAttribute("data-row-length");
        bottom = bgElements[i].getAttribute("data-bottom");

        bgElementsData.push({
            positions: positions,
            noOfParts: noOfParts,
            lengthOfRow: lengthOfRow,
            bottom: bottom
        });

        createParts(noOfParts, bgElements[i]);
        styleParts(
            noOfParts,
            lengthOfRow,
            positions,
            bgElements[i],
            documentW,
            bottom
        );
    }

    // On resize: only style parts
    window.addEventListener("resize", function() {
        documentW = document.body.offsetWidth;

        for (let i = 0; i < bgElements.length; i++) {
            positions = bgElementsData[i].positions;
            noOfParts = bgElementsData[i].noOfParts;
            lengthOfRow = bgElementsData[i].lengthOfRow;
            bottom = bgElementsData[i].bottom;

            styleParts(
                noOfParts,
                lengthOfRow,
                positions,
                bgElements[i],
                documentW,
                bottom
            );
        }
    });
});
