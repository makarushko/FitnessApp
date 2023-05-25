const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");


router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get('/', async (req, res) => {
	try {
		// Получаем идентификатор пользователя из запроса (предполагается, что он сохранен в req.user)
		const userId = req.user.id;

		// Ищем пользователя в базе данных по идентификатору
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' });
		}

		// Возвращаем информацию об авторизованном пользователе
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Внутренняя ошибка сервера' });
	}
});

// Создание нового пользователя
router.post('/', async (req, res) => {
	const user = new User(req.body);

	try {
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Редактирование информации о пользователе
router.patch('/:id', getUser, async (req, res) => {
	if (req.body.name != null) {
		res.user.name = req.body.name;
	}
	if (req.body.gender != null) {
		res.user.gender = req.body.gender;
	}
	if (req.body.height != null) {
		res.user.height = req.body.height;
	}
	// Обновление других полей

	try {
		const updatedUser = await res.user.save();
		res.json(updatedUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Удаление пользователя
router.delete('/:id', getUser, async (req, res) => {
	try {
		await res.user.remove();
		res.json({ message: 'User deleted' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Промежуточный обработчик для получения пользователя по ID
async function getUser(req, res, next) {
	try {
		const user = await User.findById(req.params.id);
		if (user == null) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.user = user;
		next();
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
}

module.exports = router;
