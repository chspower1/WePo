import { Education } from "../db";

class educationService {
    // 학력 추가
    static async addEducation({ userId, school, major, status, eduId, order }) {
        // 사용자가 필수로 입력해야하는 값이 모두 있는지 확인
        if (!school || !major || !status) {
            const errorMessage = "필수값을 모두 입력해주세요.";
            return { errorMessage };
        }

        // front에서 생성하여 넘겨주는 id값 있는지 체크
        if (!eduId) {
            const errorMessage = "eduId값이 정상적으로 생성되지 않았습니다.";
            return { errorMessage };
        }

        return Education.create({
            userId,
            school,
            major,
            status,
            eduId,
            order,
        });
    }

    // userId에 해당하는 유저의 학력 전체 조회
    static async getEducationsByUserId(userId) {
        return Education.findByUserId(userId);
    }

    // eduId에 해당하는 학력 조회
    static async getEducation(eduId) {
        return Education.findByEduId(eduId);
    }

    // 학력 수정
    static async updateEducation({ eduId, toUpdate }) {
        // 해당 eduId의 학력정보가 db에 존재하는지 여부 확인
        let education = await Education.findByEduId(eduId);

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!education) {
            const errorMessage = "학력 정보가 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        const { school, major, status } = toUpdate;

        const newValues = {
            ...(school && { school }),
            ...(major && { major }),
            ...(status && { status }),
        };

        return Education.update({ eduId, newValues });
    }

    // 학력 순서 수정
    static async updateEducationOrder(newCategories) {
        const newOrders = newCategories.map((newCategory, idx) => ({
            eduId: newCategory.eduId,
            order: idx,
        }));

        newOrders.forEach((newOrder) => {
            Education.updateOrder(newOrder);
        });

        return;
    }

    // 학력 삭제
    static async deleteEducation(eduId) {
        // 해당 eduId의 학력정보가 db에 존재하는지 여부 확인
        const education = await Education.findByEduId(eduId);

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!education) {
            const errorMessage = "학력 정보가 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        return Education.delete(eduId);
    }
}

export { educationService };
